'use strict';

const jwt = require('jsonwebtoken');
const AppError = require('../errors/appError')
const verifyToken = async (req,res,next)=>{
    const authHeader = await req.headers["x-access-token"];
    if(!authHeader) throw new AppError('Unauthorized No token',403);
    jwt.verify(authHeader,process.env.TOKENSECRET,(err,decoded)=>{
        if(err) {
            throw new AppError('Unauthorized token miss match',403);
        }
        next();
    });
}


module.exports = verifyToken;
// const logged = (req,res,next)=>{
//     if(!req.session.current){
//         return res.redirect('/signin');
//     }
//     next();
    
// }

// const teamlogged = (req,res,next)=>{
//     if(!req.session.team){
//         return res.redirect('/signin');
//     }
//     next();
    
// }
// const adminLog = (req,res,next)=>{
//     if(!req.session.admin){
//         return res.redirect('/admin/signin');
//     }
//     next();
// }

// const event = (req,res,next)=>{
//     if(!req.params.id){ 
//         return res.redirect('/events/dashboard');
//     }
//     req.session.event = req.params.id;
//     next();
// }


// const verifyEmailToken = async (req,res,next)=>{
//     const token = await req.query.q;
//     if(!token) {
//         return res.redirect('/403');
//     };
//     jwt.verify(token,process.env.TOKENSECRET,(err,decoded)=>{
//         if(err) {
//             return res.redirect('/403');
//         }
//         next();
//     });
// }


// module.exports = { logged,event,adminLog,teamlogged }