const mongoose = require('mongoose');
const app  = require('./app');

const DB = "mongodb+srv://kushalagr04:vOa9Kvwn00if4pxB@cluster0.kjvic.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(DB).then(() => console.log("DB connected"));

app.listen(8000, () => {
    console.log('Hello from the server side');
})