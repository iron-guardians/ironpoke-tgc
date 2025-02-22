const mongoose = require("mongoose");
const {isURL} = require("../validators/string.validators");

const boosterPackSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Booster Pack name is required"],
        maxLength: [20, "Booster Pack name cannot be longer than 20 characters"],
        trim: true
    },
    description: {
        type: String,
        maxLength: [100, "Booster Pack description cannot be longer than 100 characters"],
        trim: true
    },
    image: {
        type: String,
        required: [true, "Pack image is required"],
        validate: isURL,
        default: function () {
            return "https://www.only-cards.com/wp-content/uploads/2023/02/Pokemon_TCG_Scarlet_Violet_Booster_Wrap_Paldea_First_Partner_Pokemon_ES-600x1099.png";
        }
    },
    set: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Set",
        required: [true, "Set is required"]
    },
    prize: {
        type: Number,
        required: [true, "Pack prize is required"],
        min: [0, "Pack prize cannot be negative"],
        default: 0
    },
    numberOfCards: {
        type: Number,
        required: [true, "Number of cards is required"],
        min: [0, "Number of cards cannot be negative"],
        default: 5
    }
}, {
        toJSON: {
            transform: function (doc, ret) {
                delete ret.__v;
                delete ret._id;
                ret.id = doc.id;
                return ret;
            },
        },
});

const BoosterPack = mongoose.model("BoosterPack", boosterPackSchema);
module.exports = BoosterPack;