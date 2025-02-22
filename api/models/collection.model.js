const mongoose = require("mongoose");
const {isURL} = require("../validators/string.validators");

const collectionSchema = new Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    set: {
        type: Schema.Types.ObjectId,
        ref: "Set",
    },
    cards: [
        {
            card: {
                type: Schema.Types.ObjectId,
                ref: "Card",
            },
            amount: {
                type: Number,
                default: 1,
                min: 1,
            },
        },
    ],
});

const Collection = mongoose.model("Collection", collectionSchema);
module.exports = Collection;