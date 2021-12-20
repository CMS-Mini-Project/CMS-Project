const express = require("express");
const app = new express.Router();
const User = require("../../models/user/model");
const apiResponse = require("../../response");
const jwt = require("jsonwebtoken");
app.post("/register", async (req, res) => {
  const data = {
    email: req.body.email,
    lastname: req.body.lastname,
    password: req.body.password,
    firstname: req.body.firstname,
    username: req.body.username,
  };
  await User.createUser(data);
  apiResponse.created(
    {
      message: "User Registered",
    },
    res
  );
});

app.post("/login", async (req, res) => {
  const data = req.body;
  const user = await User.findUser(data);
  if (user) {
    const current = await User.findOne({ _id: user._id }).select(
      "-password"
    );
    const token = await jwt.sign({ user: current }, process.env.TOKENSECRET, {
      expiresIn: process.env.LIFESPAN,
    });
    return apiResponse.success(
      {
        message: "Access granded",
        token: token,
        user: JSON.stringify(current),
      },
      res
    );
  }
 apiResponse.unauthorized({message:'Unauthorized'},res)
});

// app.post("/admin/login", async (req, res) => {
//   const data = req.body;
//   const admin = await Admin.findUser(data);
//   if (admin) {
//     const current = await Admin.findOne({ _id: admin._id }).select(
//       "-password"
//     );
//     const token = await jwt.sign({ user: current }, process.env.TOKENSECRET, {
//       expiresIn: process.env.LIFESPAN,
//     });
//     return apiResponse.success(
//       {
//         message: "Access granded",
//         token: token,
//         admin: JSON.stringify(current),
//       },
//       res
//     );
//   }
   
//  apiResponse.unauthorized({message:'Unauthorized'},res)
// });

module.exports = app;
