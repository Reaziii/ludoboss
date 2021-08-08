const express = require("express");
const port = 8080;
const app = express();
const firebase = require("firebase");
const config = require("./firebase/config");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./firebase/firebase");
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
const firestore = db.firestore();
const ludoLogics = require('./Utils/ludoLogics');
// Routes get
const games = require("./Routes/Game");

// app.use
app.use("/game", games);

app.get("/", (req, res) => {
  res.send("server is running good!");
});

app.push('/',(req,res)=>{
    res.send({message : "fuck you"})
})


app.listen(port, () => {
  console.log("server is running at http://localhost:", port, "!");
});
