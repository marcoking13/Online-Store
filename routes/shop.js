const express = require('express');
var router = express.Router();
const ShopController = require("./../controllers/products.js");


router.get("/", ShopController.MainController);
router.get("/cart", ShopController.CartController);
router.post("/cart", ShopController.PostCartController);
router.get("/checkout", ShopController.CheckoutController);
router.get("/product-list", ShopController.ProductListController);
router.get("/product-detail/:productId",ShopController.FindProductById)



module.exports = router;
