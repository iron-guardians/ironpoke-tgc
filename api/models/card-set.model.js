const mongoose = require("mongoose");
const {isURL} = require("../validators/string.validators");

const cardSetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Set name is required"],
        maxLength: [20, "Set name cannot be longer than 20 characters"],
        trim: true
    },
    series: {
        type: String,
        maxLength: [30, "Set description cannot be longer than 100 characters"],
        trim: true
    },
    total: {
        type: Number,
        required: [true, "Set total is required"],
        min: [0, "Set total cannot be negative"],
        default: 0
    },
    images: {
        symbol: {
            type: String,
            required: [true, "Set image is required"],
            validate: isURL,
            message: "Set image URL is invalid"
        },
        logo: {
            type: String,
            required: [true, "Set image is required"],
            validate: isURL,
            message: "Set image URL is invalid"
        }
       
    }
}, {
    toJSON: {
        transform: function (doc, ret) {
            delete ret.__v;
            delete ret._id;
            ret.id = doc.id;
            return ret;
        }
    }
});

const CardSet = mongoose.model("CardSet", cardSetSchema);
module.exports = CardSet;