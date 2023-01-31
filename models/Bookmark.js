const mongoose = require("mongoose");
const BookmarkSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
    filmId: {
      type: Number,
      required: [true, "Please provide a film id"],
      unique: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Bookmark", BookmarkSchema);
