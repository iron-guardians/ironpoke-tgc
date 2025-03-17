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

module.exports.getBoosterPacks = async (req, res, next) => {
    try {
        const boosterPacks = await BoosterPack.find();
        res.status(200).json(boosterPacks);
    } catch (error) {
        next(error);
    }
};