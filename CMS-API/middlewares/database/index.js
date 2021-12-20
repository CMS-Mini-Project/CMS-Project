// 'use strict';

// const mongoose = require('mongoose');

// const MongDbURL = process.env.MONGODB_URL;

// const connectionOptions = {
//   autoIndex: false,
//   useCreateIndex: false,
//   useNewUrlParser: true,
//   useFindAndModify: false,
//   useUnifiedTopology: true,
// };

// const connection = () => {
//   return mongoose.createConnection(MongDbURL, connectionOptions);
// };

// module.exports = { connection };
const mongoose = require('mongoose');
 
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify:false,
    useUnifiedTopology: true
},(error,result)=>{
    if(error){
        return console.log(error);
    }
    console.log('DB Connected');
});
