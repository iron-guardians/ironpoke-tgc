const axios = require("axios");
const BoosterPack = require("../models/booster-packs.model");

module.exports.create = async (req, res, next) => {
    try {
        const boosterPack = await BoosterPack.create(req.body);
        res.status(201).json(boosterPack);
    } catch (error) {
        next(error);
    }
};