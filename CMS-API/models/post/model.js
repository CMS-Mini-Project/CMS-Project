const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        require:true,
        ref: "User",
    },
    image: {
        type: String,
        default: "",
        trim: true,
    },
    caption: {
        type: String,
        default: "",
        trim: true,
    },
    like: {
        type: Number,
        default: 0,
    },
    timestamp: {
        type: Date,
        required: true,
    },
    visibility: {
        type: Boolean,
        default: true,
    },

    tag: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
});

postSchema.statics.createPost = (data) => {
    return Post.create(data)
      .then((result) => result)
      .catch((error) => {
        throw new AppError(error, 400);
      });
  };
  postSchema.statics.list = (filter) => {
    return Post.find(filter).populate({
      path: "user",
      model: "User",
    })
      .then((result) => {
        return result;
      })
      .catch((error) => {
        throw new AppError(error, 400);
      });
  };

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
