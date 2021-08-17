const newUserData = require("../Utils/newUserData");

const router = require("express").Router();
const db = require("firebase").firestore();

router.post("/login", (req, res) => {
  const { userid, user } = req.body;
  if (!userid || !user) {
    res.send({ success: false });
    returj;
  }
  let ref = db.collection("users");
  ref
    .doc(userid)
    .get()
    .then((item) => {
      if (item.exists) {
        //already registered
        res.send({ success: true, message: "old user" });
      } else {
        ref
          .doc(userid)
          .set({
            displayName: user.displayName,
            email: user.email,
            photo : user.photoURL,
            ...newUserData,
          })
          .then(() => {
            res.send({ success: true, message: "registered" });
          });
      }
    });
});
module.exports = router;
