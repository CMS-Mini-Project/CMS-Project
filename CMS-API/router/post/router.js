const express = require("express");
const app = new express.Router();
const apiResponse = require("../../response");
const User = require("../../models/user/model");
const Post = require("../../models/post/model");
const auth = require("../../middlewares/auth");
const decodeService = require("../../middlewares/decode");
const { uploadFeed } = require("../../middlewares/upload");
const AppError = require("../../middlewares/errors/appError");

app.post("/create", [auth,uploadFeed.single('feed')], async(req, res) => {
    const decode = await decodeService(req.headers["x-access-token"]);
    
    const user = await  User.findOne({_id:decode._id}).select(
        "-password"
    )
    let data = {
        user:user._id,
        image:req.file.filename,
        caption:req.body.caption,
        timestamp:new Date().toISOString()
    }
    await Post.createPost(data);
    apiResponse.created(
        {
            message:'Post Created',
        },
        res
    )
});

app.get('/list',auth,async(req,res)=>{
    const posts = await Post.list({});
    apiResponse.success({
        message:'Data Served',
        data:posts
    },
    res)
})
module.exports = app;
