const mongoose = require("mongoose");
const {isURL} = require("../validators/string.validators");

const cardSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Card name is required"],
        maxLength: [20, "Card name cannot be longer than 20 characters"],
        trim: true
    },
    number: {
        type: Number,
        required: [true, "Card number is required"],
        maxLength: [16, "Card number cannot be longer than 16 characters"],
        trim: true
    },
    rarity: {
        type: String,
        required: [true, "Card rarity is required"],
        maxLength: [20, "Card rarity cannot be longer than 20 characters"],
        trim: true
    },
    image: {
        type: String,
        required: [true, "Card image is required"],
        validate: isURL,
        message: "Card image URL is invalid"
    },
    set: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Set",
        required: [true, "Set is required"]
    }
}, {
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