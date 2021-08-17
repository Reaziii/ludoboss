const router = require("express").Router();
const db = require("firebase").firestore();
const diceRoll = require("../Utils/diceRoll");
const {
  diceThekeBlockCheck,
  updateToNext,
  nextPos,
  goFromTo,
  toPossible,
} = require("../Utils/ludoLogics");
const newGameData = require("../Utils/newGameData");
router.post("/diceroll", (req, res) => {
  let { chal, gameid } = req.body;
  if (chal === undefined || gameid === undefined) {
    res.send({ success: false, message: "chal not found" });
    return;
  }
  let ref = db.collection("games").doc(gameid);
  ref.get().then(async (ret) => {
    if (!ret.exists) {
      res.send({ success: false, message: "gameid is incorrect!" });
    } else if (ret.data().chal !== chal) {
      res.send({ success: false, message: "not your chal" });
    } else if (ret.data().isdice === false) {
      res.send({ success: false, message: "not dice time" });
    } else {
      let dicevalue = diceRoll();
      let sixcount = ret.data().sixcount;
      if (dicevalue === 6 && sixcount === 2) {
        dicevalue = 5;
      }
      await ref.update({
        dicevalue: dicevalue,
        roll: true,
        isdice: false,
      });
      res.send({ success: true, message: "dice value :", dicevalue });
      let checker = diceThekeBlockCheck(chal, dicevalue, ret.data()[chal]);
      // console.log(checker.found)
      setTimeout(async () => {
        await ref.update({
          roll: false,
          isdice: false,
          givechal: true,
          timestamp: new Date().getTime(),
          sixcount: sixcount + (dicevalue === 6 ? 1 : 0),
          round: checker.round,
        });
      }, 1000);
      if (checker.found === false && dicevalue !== 6) {
        setTimeout(() => {
          updateToNext(chal, gameid, ret.data().persons);
        }, 2000);
      }

      // setTimeout(()=>{
      //   ref.get().then(ret=>{
      //     let nowtime = new Date.getTime();
      //     let dist = nowtime-ret.timestamp;
      //     if(dist>)
      //   })
      // },30000)
    }
  });
});

router.post("/uthabe", (req, res) => {
  let { chal, gameid, id } = req.body;
  if (chal === undefined || gameid === undefined || id === undefined) {
    res.send({ success: false, message: "undefined values" });
    return;
  }

  let ref = db.collection("games").doc(gameid);
  ref.get().then((ret) => {
    console.log(ret.data());
    if (!ret.exists) {
      res.send({ success: false, message: "gameid incorrect" });
    } else if (ret.data().dicevalue !== 6) {
      res.send({ success: false, message: "need 6" });
    } else if (ret.data().chal !== chal) {
      res.send({ success: false, message: "not your chal" });
    } else if (ret.data()[chal][id] !== -1) {
      res.send({ success: false, message: "your are out of the box" });
    } else if (ret.data().isdice === true || ret.data().roll === true) {
      res.send({ success: false, message: "not chal time" });
    } else {
      const stop = [0, 13, 26, 39];

      let bar = ret.data()[chal];
      bar[id] = stop[chal];
      ref
        .update({
          [chal]: bar,
          givechal: false,
          isdice: true,
        })
        .then(() => {
          res.send({ success: true, message: "uthano hoise" });
        });
    }
  });
});

router.post("/chaldibe", (req, res) => {
  let { chal, gameid, id } = req.body;
  if (chal === undefined || gameid === undefined || id === undefined) {
    res.send({ success: false, message: "undefined values" });
    return;
  }

  let ref = db.collection("games").doc(gameid);

  ref.get().then(async (ret) => {
    if (
      ret.data().isdice === true ||
      ret.data().givechal === false ||
      ret.data().roll === true
    ) {
      res.send({ success: false, message: "not chal time" });
    } else if (ret.data().chal !== chal) {
      res.send({ success: false, message: "not your chal" });
    } else {
      let bar = ret.data()[chal];
      let z = ret.data()[0];
      let o = ret.data()[1];
      let t = ret.data()[2];
      let h = ret.data()[3];
      let nxt = nextPos(chal, bar[id], ret.data().dicevalue);

      if (!toPossible(chal, nxt)) {
        res.send({ success: false, message: "chal not available" });
      } else {
        await goFromTo(chal, gameid, bar[id], nxt, bar, id, z, o, t, h).then(
          (res) => {
            if (res) {
              ref.update({
                sixcount: 0,
              });
            }
            console.log("res", res);
            setTimeout(() => {
              if (ret.data().dicevalue !== 6 && !res) {
                updateToNext(chal, gameid, ret.data().persons);
              }
            }, 1000);
          }
        );

        res.send({ success: true, message: "chal given" });
      }
    }
  });
});

router.post("/search", (req, res) => {
  let { userid, price } = req.body;

  if (userid === undefined || price === undefined) {
    res.send({ success: false, message: "user id not found!" });
    return;
  }
  console.log(userid, price);
  console.log(userid, price);

  let ref = db.collection("games");

  ref.get().then(async (ret) => {
    let found = null;
    await ret.forEach(async (element) => {
      if (
        element.data().person &&
        element.data().person.length <= 3 &&
        element.data().start === false &&
        element.data().price === price
      ) {
        // ekhane dhokiye dibo
        found = element;
      }
    });

    if (found === null) {
      ref
        .add({
          ...newGameData,
          person: [userid],
          price: price,
        })
        .then((data) => {
          res.send({ success: true, gameid: data.id, chal: 0 });
        });
    } else {
      let person = found.data().person;
      person.push(userid);
      let get = await db
        .collection("games")
        .doc(found.id)
        .update({
          person: person,
          start: person.length === 4 ? true : false,
          isdice: person.length === 4 ? true : false,
        });
      res.send({ success: true, gameid: found.id, chal: person.length - 1 });
    }
  });
});

router.post("/win", async (req, res) => {
  let { gameid } = req.body;
  console.log(gameid)

  await db
    .collection("games")
    .doc(gameid)
    .update({
      0: [57, 57, 57, 52],
      1: [63, 63, 63, 58],
      2: [69, 69, 69, 64],
    });
  res.send({ success: "ok" });
});

module.exports = router;
