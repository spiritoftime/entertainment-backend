const express = require("express");
const router = express.Router();
const {
  getAllBookmarks,
  createBookmark,
  deleteBookmark,
} = require("../controllers/bookmark");

router.route("/").get(getAllBookmarks).post(createBookmark).delete(deleteBookmark);

module.exports = router;
