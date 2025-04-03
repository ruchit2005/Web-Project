const {formidable, errors} = require('formidable');
const fs = require('fs');
const axios = require('axios');
const { getJson } = require("serpapi");
const { json } = require('express');
const { Product } = require('../models/model')
const { User } = require('../models/model')
const { Notify } = require('../models/model')


const IMGBB_API_KEY = "8a496163927b9d9e0480e2850c8f8047";
const GOOGLE_API_KEY = "86c8c71ddb4a335aa4287b3703f534421cb156d0a324333419b3826469195717"

let emailValue; 
let priceValue;
let prodTitle;

exports.getEmail = async (req,res) => {
    emailValue  = req.body;
    //console.log(emailValue.emailValue)
    if (!emailValue) {
        console.log('not Received email');
        return res.status(400).json({ error: 'Email is required' });
    }
    req.emailValue = emailValue;
    console.log(emailValue, emailValue.emailValue)
}

exports.getImage = async (req,res) => {
    const form = formidable({});
     let fields;
     let files;
     try {
         [fields, files] = await form.parse(req);
         
        //  if empty files
        if (Object.keys(files).length === 0) {
            throw new Error('No files were uploaded.');
        }

        const image = files.image[0];
        // Read the file data
        const fileData = fs.readFileSync(image.filepath);

        // Convert file data to a base64 encoded string
        const base64Image = new Buffer.from(fileData).toString('base64');

         // Prepare the payload to imgBB
         const formData = new URLSearchParams();
         formData.append('image', base64Image);
         
          // Send the request to imgBB
          const imgBBResponse = await axios.post(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, formData, {
              headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
              }
          });
 
         //console.log(JSON.stringify(imgBBResponse.data.data.url))

         //Running image in Google lens api
         const googleLensResults = await new Promise((resolve, reject) => {
            getJson(
              {
                engine: "google_lens",
                url:imgBBResponse.data.data.url,
                api_key: GOOGLE_API_KEY,
              },
              (json) => {
                if (json) {
                  resolve(json.visual_matches[0]);
                } else {
                  reject(new Error('No visual matches found in Google Lens.'));
                }
              }
            );
          });
         prodTitle = googleLensResults.title
        //console.log("Google Lens visual matches:", googleLensResults);

        //Shopping API
        const shoppingResults = await new Promise((resolve, reject) => {
            getJson(
              {
                engine: "google_shopping",
                q: googleLensResults.title,
                api_key: GOOGLE_API_KEY,
                gl:"in"
              },
              (json) => {
                if (json) {
                  resolve(json.shopping_results.slice(0,5));
                } else {
                  reject(new Error('No visual matches found in Google Lens.'));
                }
              }
            );
          });
        
        const num =[];
          //Creating document in MondoDB
        for(let i = 0;i<5; i++){
            const newProduct = await Product.create({
                title : shoppingResults[i].title.slice(0,12),
                prodURL : shoppingResults[i].link,
                price : shoppingResults[i].price,
                imgUrl : shoppingResults[i].thumbnail
            })
            num.push(newProduct._id.toString());
            console.log(`${i}:Saved`)
        }

        const newUser = await User.create({
            mail : req.emailValue,
            productId : num 
        })
        return

     } catch (err) {
         // example to check for a very specific error
         console.error(err);
         res.writeHead(err.httpCode || 400, { 'Content-Type': 'text/plain' });
         res.end(String(err));
         return;
     }    

}

exports.sendData = async (req, res) => {
    try{
        const prodData = []
        for(let i=0;i<5;i++){
            let currentId = await User.findOne({mail : emailValue.emailValue})
            let x = await Product.findById(currentId.productId[i])
            prodData.push(x)
        }
        console.log(prodData)
        return res.status(200).json({
            status : "Success",
            result : prodData.length,
            data : prodData
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            status : "Fail",
            message: 'server error'
        })   
    }
}


exports.getPrice = async (req,res) => {
    priceValue = req.body;
    if(!priceValue){
        console.log('Price not received');
        return res.status(400).json({error : 'Price is required'});
    }
    console.log(priceValue.price)

    const newNotify = await Notify.create({
        email : emailValue.emailValue,
        productName : prodTitle,
        price : priceValue.price
    })
}