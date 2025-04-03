// const express = require('express');
// const cors = require('cors');
// const mainRouter = require('./router/mainRouter');

// app = express();

// app.use(express.json())
// app.use(cors({
//     origin:'https://baniyabro.onrender.com/input-price'
// ))
// }
    

// app.use('/',mainRouter)

// module.exports = app;


const express = require('express');
const cors = require('cors');
const mainRouter = require('./router/mainRouter');

const app = express();

app.use(express.json());

app.use(cors({
    origin: 'https://baniyabro.onrender.com'
}));

app.use('/', mainRouter);

module.exports = app;
