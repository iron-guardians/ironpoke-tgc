const createError = require("http-errors");
const User = require("../models/user.model");

module.exports.create = (req, res, next) => {
    const {email} = req.body;

    console.log(req.body);

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
                credits: 500,
            }).then((user) => {
                res.status(201).json(user);
            });
        }
    })
    .catch((error) => next(error));
};

module.exports.show = (req, res, next) => {
    User.findById(req.params.id)
        .then((user) => {
            if (user) {
                res.json(user);
            } else {
                next(createError(404, "User not found"));
            }
        })
        .catch(next);
};   

module.exports.getUsers = async (req, res, next) => {
    console.log(req.params.id)

    try {
      const filter = {};
  
      if(req.params.id) {
        filter.cardId = req.params.id; 
      }
  
      if (req.query.set) {
        filter["set.id"] = req.query.set;
      } 
    
      if (req.query.types) {
        const typesArray = req.query.types.split(",");
        filter.types = { $in: typesArray };
      }
      
      const users = await User.find(filter);
  
      if (!users.length) {
        return res.status(404).json({ message: "Users not found." });
      }
  
      res.json(users);
      
    } catch (error) {
      next(error);
    }
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
};

module.exports.profile = (req, res, next) => {
    res.json(req.user);
};

module.exports.show = (req, res, next) => {
    User.findById(req.params.id)
        .then((user) => {
            if (user) {
                res.json(user);
            } else {
                next(createError(404, "User not found"));
            }
        })
        .catch(next);
}

module.exports.addCards = (req, res, next) => {
    const { cards } = req.body;

    if (!cards || cards.length === 0) {
        return next(createError(400, "No cards provided"));
    }

    // Find the user by ID
    User.findById(req.user.id)
        .then((user) => {
            if (!user) {
                return next(createError(404, "User not found"));
            }

            // Push only the 'id' of each card into the user's cards collection
            const cardIds = cards.map(card => card.id);
            user.cardsCollection.push(...cardIds);

            return user.save();  // Save the user after modifying the cards collection
        })
        .then((updatedUser) => {
            res.json(updatedUser);  // Return the updated user object with the new cards collection
        })
        .catch(next);  // Catch any errors and pass them to the error handler
};
