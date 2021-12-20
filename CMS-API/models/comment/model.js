const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    content: {
        type: String,
        required: true,
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


});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
