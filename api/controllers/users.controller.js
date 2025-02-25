const createError = require("http-errors");
const User = require("../models/user.model");

module.exports.create = (req, res, next) => {
    const {email} = req.body;

    User.findOne({email})
        .then((user) => {
            if(user) {
                next(
                    createError(400, {
                        message: "User already exists",
                        errors: {email: "User already exists"}
                    })
                );
        } else {
            return User.create({
                email: req.body.email,
                password: req.body.password,
                name: req.body.name,
                avatar: req.file?.path,
                credits: 500,
            }).then((user) => {
                res.status(201).json(user);
            });
        }
    })
    .catch((error) => next(error));
};
                          
module.exports.validate = (req, res, next) => {
    User.findOne({_id: req.params.id, activateToken: req.params.token})
        .then((user) => {
        if (user) {
            user.active = true;
            user.save().then((user) => res.json(user));
        } else {
            next(createError(404, "User not found"));
        }
    })
    .catch(next);
}

module.exports.profile = (req, res, next) => {
    res.json(req.user);
}