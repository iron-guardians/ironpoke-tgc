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

module.exports.addCards = (req, res, next) => {
    const { cards } = req.body;

    if (!cards || cards.length === 0) {
        return next(createError(400, "No cards provided"));
    }

    // Check if the user is logged in or authenticated (assuming req.user contains user data)
    if (!req.user) {
        return next(createError(401, "Unauthorized"));
    }

    // Find the user by ID
    User.findById(req.user.id)
        .then((user) => {
            if (!user) {
                return next(createError(404, "User not found"));
            }

            // Push only the 'id' of each card into the user's cards collection
            const cardIds = cards.map(card => card._id);
            user.cardsCollection.push(...cardIds);

            return user.save();  // Save the user after modifying the cards collection
        })
        .then((updatedUser) => {
            res.json(updatedUser);  // Return the updated user object with the new cards collection
        })
        .catch(next);  // Catch any errors and pass them to the error handler
};
