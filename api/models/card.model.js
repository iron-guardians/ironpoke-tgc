const mongoose = require("mongoose");

const attackSchema = new mongoose.Schema({
  name: String,
  cost: [String],
  convertedEnergyCost: Number,
  damage: String,
  text: String,
});

const weaknessSchema = new mongoose.Schema({
  type: String,
  value: String,
});

const resistanceSchema = new mongoose.Schema({
  type: String,
  value: String,
});

const setImageSchema = new mongoose.Schema({
  symbol: String,
  logo: String,
});

const setSchema = new mongoose.Schema({
  id: String,
  name: String,
  series: String,
  printedTotal: Number,
  total: Number,
  legalities: {
    unlimited: String,
  },
  ptcgoCode: String,
  releaseDate: String,
  updatedAt: String,
  images: setImageSchema,
});

const legalitiesSchema = new mongoose.Schema({
  unlimited: String,
});

const imageSchema = new mongoose.Schema({
  small: String,
  large: String,
});

const tcgplayerPriceSchema = new mongoose.Schema({
  low: Number,
  mid: Number,
  high: Number,
  market: Number,
  directLow: Number,
});

const tcgplayerSchema = new mongoose.Schema({
  url: String,
  updatedAt: String,
  prices: {
    holofoil: tcgplayerPriceSchema,
    reverseHolofoil: tcgplayerPriceSchema,
  },
});

const cardmarketPriceSchema = new mongoose.Schema({
  averageSellPrice: Number,
  lowPrice: Number,
  trendPrice: Number,
  germanProLow: Number,
  suggestedPrice: Number,
  reverseHoloSell: Number,
  reverseHoloLow: Number,
  reverseHoloTrend: Number,
  lowPriceExPlus: Number,
  avg1: Number,
  avg7: Number,
  avg30: Number,
  reverseHoloAvg1: Number,
  reverseHoloAvg7: Number,
  reverseHoloAvg30: Number,
});

const cardmarketSchema = new mongoose.Schema({
  url: String,
  updatedAt: String,
  prices: cardmarketPriceSchema,
});

const cardSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  name: String,
  supertype: String,
  subtypes: [String],
  hp: String,
  types: [String],
  evolvesFrom: String,
  attacks: [attackSchema],
  weaknesses: [weaknessSchema],
  resistances: [resistanceSchema],
  retreatCost: [String],
  convertedRetreatCost: Number,
  set: setSchema,
  number: String,
  artist: String,
  rarity: String,
  flavorText: String,
  nationalPokedexNumbers: [Number],
  legalities: legalitiesSchema,
  images: imageSchema,
  tcgplayer: tcgplayerSchema,
  cardmarket: cardmarketSchema,
}, {
    timestamps: true,
    toJSON: {
        transform: function (doc, ret) {
            delete ret._id;
            delete ret.__v;

            ret.id = doc.id;
            return ret;
        }
    }
});

const Card = mongoose.model("Card", cardSchema);
module.exports = Card;