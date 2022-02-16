const express = require("express");
const router = express.Router();
const {
  getDatas,
  setData,
  updateData,
  deleteData,
} = require("../controllers/dataController");

///
// router.get("/", getDatas);
// router.post("/", setData);

// router.put("/:id", updateData);
// router.delete("/:id", deleteData);
//burada url ler aynı olduğunda zircirleme atama yapılabilir

router.route("/").get(getDatas).post(setData);
router.route("/:id").put(updateData).delete(deleteData);

module.exports = router;
