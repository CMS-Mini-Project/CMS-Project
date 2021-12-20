const express = require('express');
const dotenv = require('dotenv');
const app = express();

dotenv.config();

require('./middlewares/database')
require('./middlewares/setup')(app);
require('./router')(app);
require('./middlewares/errors')(app);


const port = process.env.PORT || 5000;


app.listen(port, (error,result) => {
    if(error){
        return console.log(error);
    }
    console.log(`Server is up and running on port ${port}!`);
});