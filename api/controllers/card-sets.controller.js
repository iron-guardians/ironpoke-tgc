const axios = require('axios');
const CardSet = require('../models/card-set.model');

module.exports.createAllSets = async (req, res) => {
  try {
    const apiUrl = "https://api.pokemontcg.io/v2/sets";

    const response = await axios.get(apiUrl);

    const sets = response.data.data; // Access the 'data' property of the response

    const savedSets = [];

    for (const set of sets) {
      const existingSet = await CardSet.findOne({ setId: set.id });
      if (!existingSet) {
        const newSet = new CardSet({
          setId: set.id,
          name: set.name,
          series: set.series,
          printedTotal: set.printedTotal,
          total: set.total,
          legalities: set.legalities,
          images: set.images,
        });
        await newSet.save();
        savedSets.push(newSet);
      } else {
        console.log(`Set ${set.id} already exists in the database.`);
      }
    }

    res.status(201).json({
      message: "All unique sets have been added to the database.",
      savedSets,
    });
  } catch (error) {
    console.error("Error fetching or saving sets:", error);
    res.status(500).json({ message: "Error fetching or saving sets", error });
  }
};

module.exports.getSets = async (req, res) => {
  try {
    const sets = await CardSet.find();
    res.json(sets);
  } catch (error) {
    console.error("Error fetching sets:", error);
    res.status(500).json({ message: "Error fetching sets", error });
  }
};

module.exports.getSet = async (req, res) => {
  try {
    console.log(req.params.id);

    const set = await CardSet.find({ setId: req.params.id });
    if (!set) {
      return res.status(404).json({ message: "Set not found" });
    }
    res.json(set);
  } catch (error) {
    console.error("Error fetching set:", error);
    res.status(500).json({ message: "Error fetching set", error });
  }
};