const mongoose = require("mongoose");
const {isURL} = require("../validators/string.validators");
const bcrypt = require("bcryptjs");

const SALT_WORK_FACTOR = 10;
const EMAIL_PATTERN =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_PATTERN = /^.{8,}$/;

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || '')
    .split(',')
    .map((email) => email.trim().toLowerCase());

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Username is required"],
        maxLength: [20, "Username cannot be longer than 20 characters"],
        trim: true
    },

    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: [true, "Email is required"],
        match: [EMAIL_PATTERN, "Email is invalid"],
    },

    password: {
        type: String,
        required: [true, "Password is required"],
        match: [PASSWORD_PATTERN, "Password must be at least 8 characters long"],
    },

    active: {
        type: Boolean,
        default: false,
    },

    activateToken: {
        type: String,
        default: function () {
            return (
                Math.random().toString(36).substring(2, 15) +
                Math.random().toString(36).substring(2, 15) +
                Math.random().toString(36).substring(2, 15)
            );
        },
    },

    avatar: {
        type: String,
        default: function () {
            return "https://i.pinimg.com/736x/72/48/77/724877d7438cd53dbe791b52019c5fe3.jpg";
        },
        validate: {
            validator: isURL,
            message: function () {
                return "Avatar URL is invalid";
            },
        },
    },

    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },

    credits: {
        type: Number,
        default: 0,
        min: [0, "Pack prize cannot be negative"],
    },

    cardsCollection: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Card"
        }],

    lastOpen: {
        type: Date,
        default: Date.now
    }
    
}, {
    timestamps: true,
    toJSON: {
        transform: function (doc, ret) {
            delete ret.__v;
            delete ret._id;
            delete ret.password;
            delete ret.activateToken;

            ret.id = doc.id;
            return ret;
        },
    }
});

userSchema.pre("save", function (next) {
    if(ADMIN_EMAILS.includes(this.email.toLowerCase())) {
        this.role = "admin";
    }

    if(this.isModified("password")) {
        bcrypt
            .hash(this.password, SALT_WORK_FACTOR)
            .then((hash) => {
                this.password = hash;
                next();
            })
            .catch(next);
        } else {
            next();
        }
});

userSchema.methods.checkPassword = function (password) {
    return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;