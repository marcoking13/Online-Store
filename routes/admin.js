const express = require('express');

var router = express.Router();
var path = require("path");
var rootDir = require("./../util/path.js");
var products = [];
var adminController = require("./../controllers/admin.js");


const Product = require("./../models/product.js");

router.get("/add-product",adminController.AddProductController);

router.get("/admin",adminController.AdminHomePage);
router.post("/product",adminController.PostProductController);

router.get("/edit-product/:productId",adminController.EditProductController);
router.post("/edit-product/",adminController.PostEditProductController);
router.get("/delete-product/:productId",adminController.PostDeleteProduct)
router.get("/product-list",adminController.ProductListController);




exports.products = products;
exports.router = router;
