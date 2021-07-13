import mongoose from "mongoose";
const commentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String },

    content: { type: String, required: true },
    rating: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);
const postSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    rating: { type: Number, required: true },
    author: { type: String, required: true },
    authorImage: { type: String },
    numComments: { type: Number, required: true },
    isActive: { type: Boolean, default: true },

    comments: [commentSchema],
  },
  {
    timestamps: true,
  }
  // { versionKey: false }
);
const Post = mongoose.model("Post", postSchema);

export default Post;
