'use strict';

const HttpStatus = require('http-status-codes');
const apiResponse = require('../../response');
module.exports = (app) => {
    app.use((error,request,response,next)=>{
        console.log(error);
        if(error.statusCode == 403){
            
            apiResponse.forbidden({
                message:error.message,
            },
                response
            );
        }else if(error.statusCode == 400){
            apiResponse.bad_request({
                message:error.message
            },
                response
            );
        }else{
            apiResponse.internal_server_error({
                message:"Internal Server error"
            },
                response
            );
        } 
    });
}