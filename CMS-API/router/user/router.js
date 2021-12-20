const express = require('express');
const app = new express.Router();
const apiResponse = require("../../response");
const User = require("../../models/user/model");
const auth = require('../../middlewares/auth');
const decodeService = require("../../middlewares/decode");
const AppError = require('../../middlewares/errors/appError');

app.get('/list',auth, async(req,res)=>{
  const users = await User.find({}).select(
      "-password"
    );
  apiResponse.created(
      {
        message: "Data Served",
        data:users
      },
      res
  );
});
app.get('/get',auth,async(req,res)=>{
  const decode = await decodeService(req.headers["x-access-token"]);
  const user = await User.findOne({_id:decode._id}).select(
    "-password"
  ).populate([{
    path:'followers',
    model:'User',
  },{
    path:'following',
    model:'User',
  }]);
apiResponse.success(
    {
      message: "Data Served",
      data:user
    },
    res
  );
})
/* 
app.get('/get',auth,async(req,res)=>{
    const decode = await decodeService(req.headers["x-access-token"]);
    
    const user = await User.findOne({_id:decode._id}).select(
        "-password"
      ).populate([{
        path:'followers',
        model:'User',
        select:['username','image','verified']
      },{
        path:'following',
        model:'User',
        select:['username','image','verified']
      }]);
    apiResponse.success(
        {
          message: "Data Served",
          user:user
        },
        res
      );
});





app.patch('/update',auth,async (req,res)=>{
    const decode = await decodeService(req.headers["x-access-token"]);
    
    const user = await User.findOne({_id:decode._id}).select(
        "-password"
    )
    user.password = req.body.password;
    user.email = req.body.email;
    user.username = req.body.username;
    await user.save().then((result)=>{
        apiResponse.success(
            {
                message:'Updated Successfully'
            },
            res
        )
    }).catch(
        (e)=>{
            throw new AppError('Update Failed',500)
        }
    );
});

app.get('/follow/:euid/:uid',auth,async(req,res)=>{
  return await User.updateOne(
    { _id: req.params.euid },
    { $push: { followers: req.params.uid } }
  )
    .then(async (result) => {
      return await User.updateOne(
        { _id: req.params.uid },
        { $push: { following: req.params.euid } }
      )
        .then((resul) => {
          return apiResponse.success(
            {message:'success'},res
          )
        })
        .catch((e) => {
          console.log(e);
          return apiResponse.not_found(
            {message:'failed'},res
          )
        });
    })
    .catch((error) => {
      console.log(error);
      return apiResponse.internal_server_error(
        {message:'failed'},res
      )
    });
})
app.get('/unfollow/:euid/:uid',auth,async(req,res)=>{
  console.log(req.params)
  return await User.updateOne(
    { _id: req.params.euid },
    { $pull: { followers: req.params.uid } }
  ).then(async (result) => {
      return await User.updateOne(
        { _id: req.params.uid },
        { $pull: { following: req.params.euid } }
      ).then((resul) => {
        console.log(resul)
          return apiResponse.success(
            {message:'success'},res
          )
        }).catch((e) => {
          console.log(e);
          return apiResponse.not_found(
            {message:'failed'},res
          )
        });
    }).catch((error) => {
      console.log(error);
      return apiResponse.internal_server_error(
        {message:'failed'},res
      )
    });
})

 */
module.exports = app;