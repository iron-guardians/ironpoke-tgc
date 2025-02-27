const axios = require("axios");
const Card = require("../models/card.model");
const User = require("../models/user.model");
const BoosterPack = require("../models/booster-packs.model");

module.exports.storeAllCards = async (req, res, next) => {
  try {
    const pageSize = 250;
    let page = 1;
    let totalPages = 1;
    let totalCards = 0;


    const firstPage = await axios.get("https://api.pokemontcg.io/v2/cards", {
      params: { page, pageSize },
    });

    const { data, totalCount } = firstPage.data;
    totalCards = totalCount;
    totalPages = Math.ceil(totalCount / pageSize);

    console.log(`Total Cards: ${totalCards}`);
    console.log(`Total Pages: ${totalPages}`);


    for (const card of data) {
      const existingCard = await Card.findOne({ id: card.id });
      if (!existingCard) {
        await Card.create(card);
        console.log(`Stored card: ${card.name}`);
      } else {
        console.log(`Card already exists: ${card.name}`);
      }
    }
    console.log(`Stored page ${page} with ${data.length} cards`);

    for (page = 2; page <= totalPages; page++) {
      const response = await axios.get("https://api.pokemontcg.io/v2/cards", {
        params: { page, pageSize },
      });

      const cards = response.data.data;
      if (!cards || cards.length === 0) break;

      for (const card of cards) {
        const existingCard = await Card.findOne({ id: card.id });
        if (!existingCard) {
          await Card.create(card);
          console.log(`Stored card: ${card.name}`);
        } else {
          console.log(`Card already exists: ${card.name}`);
        }
      }
      console.log(`Stored page ${page} with ${cards.length} cards`);
    }

    res.json({ message: `Stored all ${totalCards} cards successfully!` });
  } catch (error) {
    console.error("Error storing cards:", error);
    next(error);
  }
};

module.exports.getCards = async (req, res, next) => {
  try {
    const filter = {};

    if (req.query.set) {
      filter["set.id"] = req.query.set;
    }

    if (req.query.types) {
      const typesArray = req.query.types.split(",");
      filter.types = { $in: typesArray };
    }

    const cards = await Card.find(filter);
    res.json(cards);
  } catch (error) {
    next(error);
  }
};

module.exports.openBoosterPack = async (req, res, next) => {
  try {
    const {boosterPackId} = req.params;

    const pack = await BoosterPack.findById(boosterPackId);

    if (!pack) {
     next(createError(404, "Booster pack not found"));
    } else {
      const cards = [];
      const cardsToPickFrom = await Card.find(pack.filter);

      for (let i = 0; i < pack.amount; i++) {
        const randomIndex = Math.floor(Math.random() * cardsToPickFrom.length);
        const card = cardsToPickFrom[randomIndex];
        cards.push(card);
        cardsToPickFrom.splice(randomIndex, 1);
      }

      res.status(200).json(cards);
    }

  } catch (error) {
    next(error);
  }
}

module.exports.getUserCards = async (req, res, next) => {
  const userId = req.params.id;
  
  try {
    const user = await User.findById(userId);
    const userCards = [];

    for (const cardId of user.cardsCollection) {
      const card = await Card.findById(cardId);
      userCards.push(card);
    }
    res.json(userCards);
  } catch (error) {
    next(error);
  }
}