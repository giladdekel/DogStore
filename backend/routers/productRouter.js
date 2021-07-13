import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import Product from "../models/productModel.js";
import Order from "../models/orderModel.js";
import User from "../models/userModel.js";
import Post from "../models/postModel.js";
import Ticket from "../models/ticketModel.js";

import { isAdmin, isAuth, isSellerOrAdmin } from "../utils.js";

const productRouter = express.Router();

productRouter.get("/activeProduct", async (req, res) => {
  const products = await Product.find({});

  for (const product of products) {
    product.isActive = true;
    console.log(product);
    await product.save();
  }
  res.json(products);
});

productRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const pageSize = 8;
    const page = Number(req.query.pageNumber) || 1;
    const name = req.query.name || "";
    const category = req.query.category || "";
    const seller = req.query.seller || "";
    const order = req.query.order || "";
    const min =
      req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0;
    const max =
      req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max) : 0;
    const rating =
      req.query.rating && Number(req.query.rating) !== 0
        ? Number(req.query.rating)
        : 0;

    const nameFilter = name ? { name: { $regex: name, $options: "i" } } : {};
    const sellerFilter = seller ? { seller } : {};
    const categoryFilter = category ? { category } : {};
    const priceFilter = min && max ? { price: { $gte: min, $lte: max } } : {};
    const ratingFilter = rating ? { rating: { $gte: rating } } : {};
    const sortOrder =
      order === "lowest"
        ? { price: 1 }
        : order === "highest"
        ? { price: -1 }
        : order === "toprated"
        ? { rating: -1 }
        : { _id: -1 };
    const count = await Product.count({
      isActive: true,
      ...sellerFilter,
      ...nameFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    });
    const products = await Product.find({
      isActive: true,
      ...sellerFilter,
      ...nameFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    })
      .populate("seller", "seller.name seller.logo")
      .sort(sortOrder)
      .skip(pageSize * (page - 1))
      .limit(pageSize);
    res.send({ products, page, pages: Math.ceil(count / pageSize), count });
  })
);

productRouter.get(
  "/top-products",
  expressAsyncHandler(async (req, res) => {
    const topProducts = await Product.find({ isActive: true })
      .sort({ rating: -1 })
      .limit(9);
    res.send(topProducts);
  })
);

productRouter.get(
  "/categories",
  expressAsyncHandler(async (req, res) => {
    const categories = await Product.find({ isActive: true }).distinct(
      "category"
    );

    res.send(categories);
  })
);

productRouter.get(
  "/categories/products",
  expressAsyncHandler(async (req, res) => {
    const categories = await Product.find({ isActive: true }).distinct(
      "category"
    );

    const productsByCategories = {};
    for (let i = 0; i < 6; i++) {
      const products = await Product.find({ category: categories[i] }).limit(3);
      productsByCategories[categories[i]] = products;
    }

    res.json(productsByCategories);
  })
);

productRouter.get(
  "/static",
  expressAsyncHandler(async (req, res) => {
    const productsStatic = await Product.aggregate([
      // { $match: { isActive: true } },
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
          totalPrice: { $sum: "$price" },
          avgRate: { $avg: "$rating" },
        },
      },
    ]);
    const productsCount = await Product.find({ isActive: true }).count();
    const ordersCount = await Order.find({ isActive: true }).count();
    const usersCount = await User.find({ isActive: true }).count();
    const postsCount = await Post.find({ isActive: true }).count();

    var date = new Date();

    const usersCountThisMonth = await User.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(date.getFullYear(), date.getMonth(), 1),
          },
          isActive: true,
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%m", date: "$createdAt" },
          },
          users: { $sum: 1 },
        },
      },
    ]);

    const postsCountThisMonth = await Post.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(date.getFullYear(), date.getMonth(), 1),
          },
          isActive: true,
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%m", date: "$createdAt" },
          },
          posts: { $sum: 1 },
        },
      },
    ]);

    let ordersByDay = await Order.aggregate([
      // {
      //   $match: {
      //     isActive: true,
      //   },
      // },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          orders: { $sum: 1 },
          sales: { $sum: "$totalPrice" },
        },
        // $sort: { createdAt: 1 },
      },
    ]);

    let usersByDay = await User.aggregate([
      // {
      //   $match: {
      //     isActive: true,
      //   },
      // },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          users: { $sum: 1 },
        },
      },
    ]);

    let postsByDay = await Post.aggregate([
      // {
      //   $match: {
      //     isActive: true,
      //   },
      // },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          posts: { $sum: 1 },
          // $sort: { createdAt: 1 },
        },
      },
    ]);

    const totalOrdersThisMonth = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(date.getFullYear(), date.getMonth(), 1),
          },
          isActive: { type: Boolean, default: true },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%m", date: "$createdAt" },
          },
          orders: { $sum: 1 },
        },
      },
    ]);
    const totalEarning = await Order.aggregate([
      {
        $match: {
          isActive: true,
        },
      },
      {
        $group: {
          _id: null,
          sales: { $sum: "$totalPrice" },
        },
      },
    ]);

    const totalEarningThisMonth = await Order.aggregate([
      {
        $match: {
          isActive: true,
        },
      },
      {
        $match: {
          createdAt: {
            $gte: new Date(date.getFullYear(), date.getMonth(), 1),
          },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%m", date: "$createdAt" },
          },
          sales: { $sum: "$totalPrice" },
        },
      },
    ]);

    const totalProducts = await Product.aggregate([
      {
        $match: {
          isActive: true,
        },
      },
      {
        $group: {
          _id: null,
          products: { $sum: 1 },
        },
      },
    ]);

    const totalPosts = await Post.aggregate([
      {
        $match: {
          isActive: true,
        },
      },
      {
        $group: {
          _id: null,
          posts: { $sum: 1 },
        },
      },
    ]);

    const totalProductsThisMonth = await Product.aggregate([
      {
        $match: {
          isActive: true,
        },
      },
      {
        $match: {
          createdAt: {
            $gte: new Date(date.getFullYear(), date.getMonth(), 1),
          },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%m", date: "$createdAt" },
          },
          products: { $sum: 1 },
        },
      },
    ]);

    ///////tickets start/////////////

    const totalTickets = await Ticket.aggregate([
      {
        $match: {
          isActive: true,
        },
      },
      {
        $group: {
          _id: null,
          tickets: { $sum: 1 },
        },
      },
    ]);

    const totalTicketsThisMonth = await Ticket.aggregate([
      {
        $match: {
          isActive: true,
        },
      },
      {
        $match: {
          createdAt: {
            $gte: new Date(date.getFullYear(), date.getMonth(), 1),
          },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%m", date: "$createdAt" },
          },
          tickets: { $sum: 1 },
        },
      },
    ]);

    ////// tickets end////////////
    usersByDay = usersByDay.sort(
      (d1, d2) => new Date(d1._id) - new Date(d2._id)
    );

    ordersByDay = ordersByDay.sort(
      (d1, d2) => new Date(d1._id) - new Date(d2._id)
    );

    postsByDay = postsByDay.sort(
      (d1, d2) => new Date(d1._id) - new Date(d2._id)
    );

    res.send({
      usersByDay,
      usersCount,
      usersCountThisMonth,
      ordersCount,
      totalOrdersThisMonth,
      totalEarning,
      totalEarningThisMonth,
      ordersByDay,
      productsStatic,
      postsCount,
      postsCountThisMonth,
      postsByDay,
      totalPosts,
      totalProducts,
      totalProductsThisMonth,
      totalTickets,
      totalTicketsThisMonth,
    });
  })
);

productRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    // await Product.remove({});
    const seller = await User.findOne({ isSeller: true });
    if (seller) {
      const products = data.products.map((product) => ({
        ...product,
        seller: seller._id,
      }));
      const createdProducts = await Product.insertMany(products);
      res.send({ createdProducts });
    } else {
      res
        .status(500)
        .send({ message: "No seller found. first run /api/users/seed" });
    }
  })
);

productRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id).populate(
      "seller",
      "seller.name seller.logo seller.rating seller.numReviews"
    );
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

productRouter.post(
  "/",
  isAuth,
  isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = new Product({
      name: "sample name " + Date.now(),
      seller: req.user._id,
      image: "/images/p1.jpg",
      price: 0,
      category: "sample category",
      brand: "sample brand",
      countInStock: 0,
      rating: 0,
      numReviews: 0,
      description: "sample description",
    });
    const createdProduct = await product.save();
    res.send({ message: "Product Created", product: createdProduct });
  })
);
productRouter.put(
  "/:id",
  isAuth,
  isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      product.name = req.body.name;
      product.price = req.body.price;
      product.image = req.body.image;
      product.category = req.body.category;
      product.brand = req.body.brand;
      product.countInStock = req.body.countInStock;
      product.description = req.body.description;
      const updatedProduct = await product.save();
      res.send({ message: "Product Updated", product: updatedProduct });
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

productRouter.delete(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      // const deleteProduct = await product.remove();

      product.isActive = !product.isActive;
      await product.save();

      res.send({ message: "Product Deleted", product: product });
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

productRouter.post(
  "/:id/reviews",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      if (product.reviews.find((x) => x.name === req.user.name)) {
        return res
          .status(400)
          .send({ message: "You already submitted a review" });
      }
      const review = {
        name: req.user.name,
        image: req.body.image,
        rating: Number(req.body.rating),
        comment: req.body.comment,
      };
      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((a, c) => c.rating + a, 0) /
        product.reviews.length;
      const updatedProduct = await product.save();
      res.status(201).send({
        message: "Review Created",
        review: updatedProduct.reviews[updatedProduct.reviews.length - 1],
      });
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

export default productRouter;
