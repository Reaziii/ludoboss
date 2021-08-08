const route = require("express").Router();
const diceRoll = require("../Utils/diceRoll");
const {
  diceThekeBlockCheck,
  updateToNext,
  nextPos,
  toPossible,
  goFromTo,
} = require("../Utils/ludoLogics");
const firestore = require("../firebase/firebase").firestore();
const newGameData = require("../Utils/newGameData");
route.post("/diceroll", async (req, res) => {
  const { chal, userid, gameid } = req.body;
  if (!gameid) {
    res.send({ success: "error", message: "game id not found" });
    return;
  }
  if (chal === undefined) {
    res.send({ message: "chal not found", success: false });
    return;
  }
  let ref = firestore.collection("games").doc(gameid);
  await ref.get().then(async (data1) => {
    if (!data1.exists || data1.data().chal !== chal || !data1.data().isdice) {
      res.send({ success: false });
      return;
    }
    let six = data1.data().sixcount;
    let dicevalue = diceRoll();

    if (six === 2) dicevalue = 5;
    let next = diceThekeBlockCheck(chal, dicevalue, data1.data().pos);
    if (next.found === false && dicevalue !== 6) {
      //chal will be gone to next one
      updateToNext(chal, gameid, data1.data().person);
      res.send({ success: true, message: "next one" });
      return;
    }
    //chal is available
    ref
      .update({
        isdice: false,
        dicevalue: dicevalue,
        sixcount: dicevalue === 6 ? six + 1 : 0,
      })
      .then(() => {
        res.send({ success: true, message: "update" });
      })
      .catch(() => {
        res.send({ success: false, message: "server error" });
      });
  });
});

route.post("/newgame", async (req, res) => {
  let { userid, price } = req.body;
  if (!userid) {
    res.send({ success: true, message: "user not found" });
    return;
  }
  if (price === undefined) {
    res.send({ success: false, message: "price not found" });
    return;
  }
  await firestore
    .collection("games")
    .add({
      ...newGameData,
      person: [userid],
      0: 4,
      price,
    })
    .then((ret) => {
      res.send({ success: true, gameid: ret.id });
    })
    .catch((err) => {
      res.send({ success: false, message: err });
    });
});

route.post("/searchgame", async (req, res) => {
  let { userid, price } = req.body;
  if (!userid) {
    res.send({ success: true, message: "user not found" });
    return;
  }
  if (price === undefined) {
    res.send({ success: false, message: "price not found" });
    return;
  }

  price = Number(price);
  console.log(price);
  await firestore
    .collection("games")
    .get()
    .then(async (ret) => {
      let found = 0;
      await ret.forEach(async (data) => {
        let item = data.data();
        if (item.person.length <= 3 && !item.isRoom && item.price === price) {
          found = data.id;
        }
      });
      if (found === 0) {
        //create new game
        await firestore
          .collection("games")
          .add({
            ...newGameData,
            person: [userid],
            0: 4,
            price: price,
            total: 0,
          })
          .then((ret) => {
            res.send({ success: true, gameid: ret.id });
          })
          .catch((err) => {
            res.send({ success: false, message: err });
          });
      } else {
        //we have one
        await firestore
          .collection("games")
          .doc(found)
          .get()
          .then(async (data1) => {
            let person = data1.data().person;
            let id = person.length;
            person.push(userid);
            await firestore
              .collection("games")
              .doc(found)
              .update({
                person,
                [id]: 4,
                total: price * (id + 1),
                waitting: person.length === 4 ? false : true,
              })
              .then((get) => {
                res.send({ success: true, gameid: data1.id });
              })
              .catch((err) => {
                res.send({ success: false });
              });
          });
      }
    });
});

route.post("/notonuthabe", async (req, res) => {
  let { chal, gameid } = req.body;
  if (chal === undefined) {
    res.send({ success: false });
    return;
  }
  if (gameid === undefined) {
    res.send({ success: false });
    return;
  }
  let ref = firestore.collection("games").doc(gameid);
  await ref.get().then((data) => {
    if (
      data.data().chal !== chal ||
      data.data().isdice ||
      data.data().dicevalue !== 6 ||
      data.data()[chal] === 0
    ) {
      res.send({ success: false });
      return;
    }
    let to =
      chal === 0 ? 0 : chal === 1 ? 13 : chal === 2 ? 26 : chal === 3 ? 39 : 4;
    if (chal === 4) {
      res.send({ success: false });
      return;
    }
    let pos = data.data().pos;
    pos[to][chal] += 1;
    ref
      .update({
        [chal]: data.data()[chal] - 1,
        pos: pos,
      })
      .then((ret) => {
        res.send({ success: true });
      })
      .catch(() => res.send({ success: false }));
  });
});

route.post("/chaldibe", async (req, res) => {
  let { userid, chal, from, gameid } = req.body;
  if (chal === undefined || from === undefined || gameid === undefined) {
    res.send({ success: false });
    return;
  }

  let ref = firestore.collection("games").doc(gameid);
  await ref.get().then(async (ret) => {
    if (ret.data().chal !== chal || ret.data().isdice) {
      res.send({ success: false });
      return;
    }
    let nxt = nextPos(chal, from, res.data().dicevalue);
    if(ret.data().pos[from][chal] && toPossible(chal,nxt)){
        await goFromTo(chal,gameid,from,nxt,ret.data().pos);
        if(res.data().dicevalue!==6){
            updateToNext();
        }
        res.send({success : true});
        return ;
    }
    else{
        res.send({success : false});
        return ;
    }

  });
});

module.exports = route;
