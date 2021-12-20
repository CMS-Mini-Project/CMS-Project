const mongoose = require("mongoose");

const replySchema = mongoose.Schema({
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
    timestamp: {
        type: Date,
        required: true,
    },
    like: {
        type: Number,
        default: 0,
    },
});

const Reply = mongoose.model("Reply", replySchema);
module.exports = Reply;
