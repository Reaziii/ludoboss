const router = require("express").Router();
var axios = require("axios");
const db = require("firebase").firestore();

router.post("/pImage", async (req, res) => {
  const { url } = req.body;

  if (!url) {
    res.send({ message: "url not found" });
    return;
  }

  const image = await axios.get(url, { responseType: "arraybuffer" });
  if (!image) res.send({ content: null });
  const raw = Buffer.from(image.data).toString("base64");
  const base64Image =
    "data:" + image.headers["content-type"] + ";base64," + raw;

  res.send({ content: base64Image });
});

router.post("/timage", async (req, res) => {
  let { userid } = req.body;

  let item = await db.collection("users").doc(userid).get();
  if (!item.exists) {
    res.send({ success: false });
    return;
  }

  let url = await item.data().photo;

  if (!url) {
    res.send({ message: "url not found" });
    return;
  }
  let win = item.data().onlineWin;
  const image = await axios.get(url, { responseType: "arraybuffer" });
  if (!image) res.send({ content: null });
  const raw = Buffer.from(image.data).toString("base64");
  const base64Image =
    "data:" + image.headers["content-type"] + ";base64," + raw;

  res.send({ content: base64Image,displayName : item.data().displayName,win : win});
});

module.exports = router;
