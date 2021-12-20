"use strict";
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

require("express-async-errors");

module.exports = (app) => {
  app.set("trust proxy", true);
  //cors
  app.use(cors());
  
  // Body Parser Middleware
  app.use(express.text());
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true, limit: "10mb" }));

  // Logging
  app.use(morgan("dev"));
};
