require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const {loadSession} = require("./config/session.config");
const {loadSessionUser} = require("./middlewares/session.middleware");
const {cors} = require("./config/cors.config");

require("./config/db.config");

const app = express();

// MIDDLEWARES
app.use(cors);
app.use(express.json());
app.use(logger("dev"));
app.use(loadSession);
app.use(loadSessionUser);

const routes = require("./config/routes.config");
app.use("/api/v1/", routes);

const port = Number(process.env.PORT || 3000);

if (process.env.NODE_ENV !== "test") {
    app.listen(port, () => {
        console.info(`Server started on port ${port}`);
    });
}
  
module.exports = app;
// app.listen(port, () => console.info(`Server started on port ${port}`));