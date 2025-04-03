const { Notify } = require('../models/model');
const { getJson } = require("serpapi");

exports.printdata = async () => {
    const data = await Notify.find()
    const data_length = data.length

    for(let i=0;i<data_length;i++){
        console.log(`${i}DATA`)
        const shoppingResults = await new Promise((resolve, reject) => {
            getJson(
            {
                engine: "google_shopping",
                q: data[i].productName,
                api_key: "86c8c71ddb4a335aa4287b3703f534421cb156d0a324333419b3826469195717",
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
        console.log(shoppingResults)

    }
}