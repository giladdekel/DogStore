import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import Post from "../models/postModel.js";
// import Order from "../models/orderModel.js";
// import User from "../models/userModel.js";
import { isAdmin, isAuth, isSellerOrAdmin } from "../utils.js";

const postRouter = express.Router();

postRouter.get("/activePost", async (req, res) => {
  const posts = await Post.find({});

  for (const post of posts) {
    post.isActive = true;
    console.log(post);
    await post.save();
  }
  res.json(posts);
});

postRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const posts = await Post.find({ isActive: true });
    res.send(posts);
  })
);

// postRouter.get(
//   "/",
//   expressAsyncHandler(async (req, res) => {
//     const pageSize = 4;
//     const page = Number(req.query.pageNumber) || 1;
//     const name = req.query.name || "";
//     const category = req.query.category || "";
//     const seller = req.query.seller || "";
//     const order = req.query.order || "";
//     const min =
//       req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0;
//     const max =
//       req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max) : 0;
//     const rating =
//       req.query.rating && Number(req.query.rating) !== 0
//         ? Number(req.query.rating)
//         : 0;

//     const nameFilter = name ? { name: { $regex: name, $options: "i" } } : {};
//     const sellerFilter = seller ? { seller } : {};
//     const categoryFilter = category ? { category } : {};
//     const priceFilter = min && max ? { price: { $gte: min, $lte: max } } : {};
//     const ratingFilter = rating ? { rating: { $gte: rating } } : {};
//     const sortOrder =
//       order === "lowest"
//         ? { price: 1 }
//         : order === "highest"
//         ? { price: -1 }
//         : order === "toprated"
//         ? { rating: -1 }
//         : { _id: -1 };
//     const count = await Post.count({
//       ...sellerFilter,
//       ...nameFilter,
//       ...categoryFilter,
//       ...priceFilter,
//       ...ratingFilter,
//     });
//     const posts = await Post.find({
//       ...sellerFilter,
//       ...nameFilter,
//       ...categoryFilter,
//       ...priceFilter,
//       ...ratingFilter,
//     })
//       .populate("seller", "seller.name seller.logo")
//       .sort(sortOrder)
//       .skip(pageSize * (page - 1))
//       .limit(pageSize);
//     res.send({ posts, page, pages: Math.ceil(count / pageSize), count });
//   })
// );

postRouter.get(
  "/top-posts",
  expressAsyncHandler(async (req, res) => {
    const topPosts = await Post.find({ isActive: true })
      .sort({ rating: -1 })
      .limit(3);
    res.send(topPosts);
  })
);

// postRouter.get(
//   "/categories",
//   expressAsyncHandler(async (req, res) => {
//     const categories = await Post.find().distinct("category");

//     res.send(categories);
//   })
// );

// postRouter.get(
//   "/categories/posts",
//   expressAsyncHandler(async (req, res) => {
//     const categories = await Post.find().distinct("category");

//     const postsByCategories = {};
//     for (let i = 0; i < 6; i++) {
//       const posts = await Post.find({ category: categories[i] }).limit(3);
//       postsByCategories[categories[i]] = posts;
//     }

//     res.json(postsByCategories);
//   })
// );

postRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    await Post.remove({});

    const createdPosts = await Post.insertMany(data.posts);
    res.send({ createdPosts });
  })
);

postRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (post) {
      res.send(post);
    } else {
      res.status(404).send({ message: "Post Not Found" });
    }
  })
);

postRouter.post(
  "/",
  isAuth,
  isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const post = new Post({
      name: "sample title " + Date.now(),
      image: "/images/b1.jpg",
      category: "General",
      description: "sample content",
      rating: 0,
      author: "Admin",
      authorImage: "/images/admin.jpg",
      numComments: 0,
    });
    const createdPost = await post.save();
    res.send({ message: "Post Created", post: createdPost });
  })
);
postRouter.put(
  "/:id",
  isAuth,
  isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (post) {
      post.name = req.body.name;
      post.image = req.body.image;
      post.category = req.body.category;
      post.description = req.body.description;
      post.author = req.body.author;
      post.authorImage = req.body.authorImage;

      const updatedPost = await post.save();
      res.send({ message: "Post Updated", post: updatedPost });
    } else {
      res.status(404).send({ message: "Post Not Found" });
    }
  })
);

postRouter.delete(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (post) {
      // const deletePost = await post.remove();

      post.isActive = !post.isActive;

      await post.save();

      res.send({ message: "Post Deleted", post: post });
    } else {
      res.status(404).send({ message: "Post Not Found" });
    }
  })
);

postRouter.post(
  "/:id/comments",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (post) {
      const comment = {
        name: req.user.name,
        image: req.body.image,
        rating: Number(req.body.rating),
        content: req.body.content,
      };
      post.comments.push(comment);
      post.numComments = post.comments.length;
      post.rating =
        post.comments.reduce((a, c) => c.rating + a, 0) / post.comments.length;
      const updatedPost = await post.save();
      res.status(201).send({
        message: "Comment Created",
        comment: updatedPost.comments[updatedPost.comments.length - 1],
      });
    } else {
      res.status(404).send({ message: "Post Not Found" });
    }
  })
);

export default postRouter;
