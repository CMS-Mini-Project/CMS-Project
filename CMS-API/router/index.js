
const auth = require("./authentication/router");
const user = require("./user/router");
const post = require("./post/router");

const common = require("./common/router");

module.exports = (app) => {
  app.use("/", auth);
  app.use("/user", user);
  app.use('/post',post)
  app.use('/common',common)
};
