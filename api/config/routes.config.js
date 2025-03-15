const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const createError = require("http-errors");

const users = require("../controllers/users.controller");
const sessions = require("../controllers/sessions.controller");
const auth = require("../middlewares/session.middleware");
const cards = require("../controllers/cards.controller");
const boosterPacks = require("../controllers/booster-packs.controller");
const cardSets = require("../controllers/card-sets.controller");

router.post("/booster-packs", boosterPacks.create);

router.post("/cards", cards.storeAllCards);
router.get("/cards", cards.getCards);
router.get("/cards/:id", cards.getCards);


router.get("/open-booster-pack/:boosterPackId", cards.openBoosterPack);

router.get("/user-cards", auth.isAuthenticated, cards.getUserCards)
router.get("/user-cards/:userId?", auth.isAuthenticated, cards.getUserCards);

router.post("/card-sets", cardSets.createAllSets);
router.get("/card-sets", cardSets.getSets);
router.get("/card-sets/:id", cardSets.getSet);

router.post("/users", users.create);
router.get("/users", users.getUsers);
router.get("/users/me", auth.isAuthenticated, users.show);
router.get("/users/:id", users.show);
router.get("/users/:id/validate", users.validate);
router.patch("/users/add-cards", auth.isAuthenticated, users.addCards);

router.post("/sessions", sessions.create);
router.delete("/sessions", auth.isAuthenticated, sessions.destroy);


router.get("/profile/:id", auth.isAuthenticated, users.show);
router.get("/profile/me", auth.isAuthenticated, users.show);


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