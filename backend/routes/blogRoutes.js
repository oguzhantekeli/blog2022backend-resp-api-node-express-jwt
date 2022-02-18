const express = require("express");
const router = express.Router();
const {
  getBlogs,
  getBlog,
  setBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");

///
// router.get("/", getBlogs);
// router.post("/", setBlog);

// router.put("/:id", updateBlog);
// router.delete("/:id", deleteBlog);
//burada url ler aynı olduğunda zircirleme atama yapılabilir

router.route("/").get(getBlogs).post(setBlog);
router.route("/:id").put(updateBlog).delete(deleteBlog).get(getBlog);

module.exports = router;
