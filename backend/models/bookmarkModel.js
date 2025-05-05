import mongoose from "mongoose"

const bookmarkSchema = mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    favicon: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
)

const Bookmark = mongoose.model("Bookmark", bookmarkSchema)

export default Bookmark
