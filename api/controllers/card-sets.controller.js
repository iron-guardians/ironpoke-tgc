const axios = require('axios');
const CardSet = require('../models/card-set.model');

module.exports.createAllSets = async (req, res) => {
  try {
    const apiUrl = "https://api.pokemontcg.io/v2/sets/";

    const response = await axios.get(apiUrl);

    const sets = response.data.data;

    const savedSets = [];

    for (const set of sets) {
      const existingSet = await CardSet.findOne({ id: set.id });
      if (!existingSet) {
        const newSet = new CardSet({
          id: set.id,
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
