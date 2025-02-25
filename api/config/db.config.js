const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
    .then(() => console.info(`Connected to MongoDB: ${MONGODB_URI}`))
    .catch(error => {
        console.error(`Error connecting to MongoDB: ${MONGODB_URI}`, error);
        process.exit(0);
    });

process.on('SIGINT', () => {
    mongoose.connection.close()
        .finally(() => {
        console.log(`Database connection closed`);
        process.exit(0);
        })
    });