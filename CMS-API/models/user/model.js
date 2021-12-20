const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const AppError = require("../../middlewares/errors/appError");

const userSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    trim: true,
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  bio: {
    type: String,
    default: "",
    trim: true,
  },
  image: {
    type: String,
    default: "",
    trim: true,
  },
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});


//find user
userSchema.statics.findUser = async (filter) => {
  const user = await User.findOne({ email: filter.email });
  if(!user){
    return false;
  }
  const isMatch = await bcryptjs.compare(filter.password, user.password);
  if (!isMatch) {
    throw new AppError(error.message,400);
  }
  return user;
};
userSchema.statics.getOne = async (filter) => {
  const user = await User.findOne({ email: filter.email }).select(
    "-password"
);
  if(!user){
    throw new AppError(error.message,400);
  }
   
  return user;
};

//create user
userSchema.statics.createUser = async (data) => {
  const user = new User(data);
  return user
    .save()
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.log(error)
      throw new AppError(error.message,400);
    });
};

//password encryption before saving
userSchema.pre("save", async function (next) {
  if (this.password) {
    const salt = await bcryptjs.genSalt(12);
    this.password = await bcryptjs.hash(this.password, salt);
  }
  next();
});


const User = mongoose.model("User", userSchema);

module.exports = User;
