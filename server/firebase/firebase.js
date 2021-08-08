const config = require("./config");
const firebase = require("firebase");
const db = firebase.initializeApp(config);
module.exports = db;
