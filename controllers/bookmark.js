const Bookmark = require("../models/Bookmark");

const getAllBookmarks = async (req, res) => {
  const bookmarks = await Bookmark.find({ createdBy: req.headers.createdby });
  res.status(200).json({ bookmarks, count: bookmarks.length });
};

const createBookmark = async (req, res) => {
  const bookmark = await Bookmark.create(req.body);
  res.status(201).json({ bookmark });
};

const deleteBookmark = async (req, res) => {
  const bookmark = await Bookmark.deleteOne(req.body);
  res.status(202).send({ msg: "successfully unbookmarked" });
};

module.exports = {
  getAllBookmarks,
  createBookmark,
  deleteBookmark,
};
