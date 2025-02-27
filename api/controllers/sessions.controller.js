const User = require("../models/user.model");
const createError = require("http-errors");

module.exports.create = async (req, res, next) => {
    const { email, password } = req.body;

    User.findOne({ email })
        .then((user) => {
            if(user) {
                user
                    .checkPassword(password)
                    .then((isMatch) => {
                        if(isMatch) {
                            req.session.userId = user.id;
                            res.status(201).json(user);
                        } else {
                            next(createError(401, {
                                message: "Invalid credentials",
                                errors: { email : "Invalid mail or password."},
                            }))
                        }
                    })
                    .catch(next);
            } else {
                next(createError(401, {
                    message: "Invalid credentials",
                    errors: { email : "Invalid mail or password."},
                }))
            }
        })
        .catch(next);      
};

module.exports.destroy = (req, res, next) => {
    req.session.destroy();
    req.status(204).send();
}