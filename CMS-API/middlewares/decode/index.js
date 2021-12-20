'use strict';


const jwt = require('jsonwebtoken');

const AppError = require('../errors/appError')
const decodeToken = (token)=>{ 
    return jwt.verify(token,process.env.TOKENSECRET,(err,decoded)=>{
        if(err) throw new AppError('Unauthorized token miss match',403);
        return decoded.user;
    });
}


module.exports = decodeToken;