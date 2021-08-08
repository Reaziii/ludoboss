let firestore = require("../firebase/firebase").firestore();

const gamedata = async (data, id) => {
  let ref = await firestore.collection("games").doc(id).get();
  if (ref.exists) {
    return ref[data];
  } else return null;
};


module.exports = gamedata;