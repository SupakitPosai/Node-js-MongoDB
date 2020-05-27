const express = require("express");
const multer = require("multer");
const fs = require("fs");
const mongoose = require("mongoose");
const router = express.Router();

const Product = require("../models/product");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload/img_product");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname);
  },
});

var upload = multer({ storage: storage });

router.get("/", (req, res, next) => {
  Product.find()
    .exec()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => console.log(err));
});

router.get("/:productId", (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
    .exec()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => console.log(err));
});

router.post("/", (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name_product: req.body.name_product,
    price_product: req.body.price_product,
    description_product: req.body.description_product,
  });
  product
    .save()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: "POST product , Connected !",
        data: result,
      });
    })
    .catch((err) => console.log(err));
});

router.put("/:productId", upload.single("file"), (req, res, next) => {
  const id = req.params.productId;
  Product.find({ price_product: { $gt: Number(id) } })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => console.log(err));
});

router.delete("/:productId", (req, res, next) => {
  const id = req.params.productId;
  res.status(200).json({
    message: "DELETE product",
    id: id,
  });
});
module.exports = router;
