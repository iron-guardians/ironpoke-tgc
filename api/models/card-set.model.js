const mongoose = require("mongoose");
const {isURL} = require("../validators/string.validators");

// Define the schema for the Card Set
const cardSetSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    series: { type: String, required: true },
    printedTotal: { type: Number, required: true },
    total: { type: Number, required: true },
    legalities: {
      unlimited: { type: String, required: true },
    },
    images: {
      symbol: { type: String, required: true },
      logo: { type: String, required: true },
    },
  },
  {
    timestamps: true,
    toJSON: {
        transform: function (doc, ret) {
            delete ret.__v;
            delete ret._id;
            ret.id = doc.id;
            return ret;
        }
    }
  }
);

const CardSet = mongoose.model("CardSet", cardSetSchema);
module.exports = CardSet;
