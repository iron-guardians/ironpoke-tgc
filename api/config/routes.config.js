const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const createError = require("http-errors");

const users = require("./users.model");
const cards = require("./cards.model");
const boosterPacks = require("./booster-packs.model");
const cardSets = require("./card-sets.model");
const collections = require("./collections.model");

router.use((req, res, next) => {
    next(createError(404, "Route not found"));
});

router.use((error, req, res, next) => {
    if (
      error instanceof mongoose.Error.CastError &&
      error.message.includes("_id")
    )
      error = createError(404, "Resource not found");
    else if (error instanceof mongoose.Error.ValidationError)
      error = createError(400, error);
    else if (!error.status) error = createError(500, error.message);
    console.error(error);
  
    const data = {};
    data.message = error.message;
    if (error.errors) {
      data.errors = Object.keys(error.errors).reduce((errors, errorKey) => {
        errors[errorKey] =
          error.errors[errorKey]?.message || error.errors[errorKey];
        return errors;
      }, {});
    }
    res.status(error.status).json(data);
  });
  
  module.exports = router;