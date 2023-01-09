const Product = require("./../models/product.js");
const path = require("path");
var rootDir = require("./../util/path.js");
var adminData = require("./../routes/admin.js");
const Cart = require("./../models/cart.js");

const MainController = (req,res,next) =>{


  Product.fetchAll((products)=>{
    res.render(path.join(rootDir,"views","/shop/shop.ejs"),{
      products:products,
      path:"/",
      activeHome:true,
      pageTitle:"Home Page"
    });

   });
}




const FindProductById = (req,res,next)=>{
  const product_id = req.params.productId;

  Product.findById(product_id,prod=>{
    console.log(prod);

  res.render(path.join(rootDir,"views","/shop/product-detail.ejs"),{
    product:prod,
    path:"/product",
    activeHome:true,
    pageTitle:"Product Detail Page"
  });
});
}



const ProductListController = (req,res,next) =>{
  Product.fetchAll((products)=>{
    res.render(path.join(rootDir,"views","/shop/product-list.ejs"),{
      products:products,
      path:"/",
      activeHome:true,
      pageTitle:"Product List Page"
    });
  })
}


const CartController = (req,res,next) =>{
  Product.fetchAll((products)=>{
    res.render(path.join(rootDir,"views","/shop/cart.ejs"),{
      products:products,
      path:"/",
      activeHome:true,
      pageTitle:"Cart Page"
    });

   });
}

const PostCartController = (req,res,next) =>{
  var product_id = req.body.productId;
  Product.findById(product_id,(prods)=>{
    Cart.addProduct(product_id,prods.price);

  })
}


const CheckoutController = (req,res,next) =>{

  Cart.getCart((cart)=>{
  Product.fetchAll((products)=>{
    const new_cart = []
    for (product in products){
      var data = cart.products.find(prod => prod.id == product.id);
      if(data){
        new_cart.push({productData:product,qty:data.qty});
      }
    }
    res.render(path.join(rootDir,"views","/shop/cart.ejs"),{
      products:new_cart,
      path:"/checkout",
      totalPrice:cart.totalPrice,
      activeHome:true,
      pageTitle:"Checkout Page"
    });
  });
   });
}

exports.MainController = MainController;
exports.FindProductById = FindProductById;
exports.CheckoutController = CheckoutController;
exports.CartController = CartController;
exports.PostCartController = PostCartController;
exports.ProductListController = ProductListController;
