const mongoose = require('mongoose');
const { type } = require('os');

const productsSchema = new mongoose.Schema({
    title : String,
    prodURL : String,
    price : String,
    imgUrl : String,
})

const UserSchema = new mongoose.Schema({
    mail : String,
    productId : [String],
    time : {
        type : Date,
        default : Date.now()
    }
})

const NotifySchema = new mongoose.Schema({
    email : String,
    productName: String,
    price : Number
});

const Notify = mongoose.model('Notify',NotifySchema)
const Product = mongoose.model('Product',productsSchema);
const User = mongoose.model('User',UserSchema);
module.exports = {
    Product : Product ,
    User : User,
    Notify : Notify
}