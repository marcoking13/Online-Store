const path = require("path");
var rootDir = require("./../util/path.js");
const Product = require("./../models/product.js")
var adminData = require("./../routes/admin.js");


const AdminHomePage = (req,res,next)=>{
  res.render(path.join(rootDir,"views","/admin/admin.ejs"),{path:"/admin/admin",pageTitle:"Overview"});
}


const PostProductController = (req,res,next) =>{

    var body = req.body;
    var new_item = {
      title: body.title,
      id:null,
      image:body.image,
      description:body.description,
      price:body.price
    }
    console.log(new_item);

    const product = new Product(new_item);
    product.save();

    res.redirect("/");

}

const AddProductController =(req,res,next)=>{

  Product.fetchAll((products)=>{
    res.render(path.join(rootDir,"views","/admin/add-product.ejs"),{
      products:products,
      path:"/admin/add-product",
      pageTitle:"Add Product",
    });
  })

}


const EditProductController = (req,res,next) => {

  const id = req.params.productId;
  console.log(id);

  Product.findById(id,(product)=>{
    if(product){
    res.render(path.join(rootDir,"views","/admin/edit-product.ejs"),{
      product:product,
      name:product.title,
      description:product.description,
      price: product.price,

      path:"/admin/edit-product",
      pageTitle:"Edit Product",
    })
  }else{
    console.log("No Product");
    res.render("/");
  }
  })
}

const PostDeleteProduct = (req,res,next) =>{
  var id = req.params.productId;
  Product.delete(id);
  res.redirect("/admin/product-list");
}

const PostEditProductController = (req,res,next) =>{
  var body = req.body
    var updated_product = {
      title:body.title,
      id:body.id,
      price:body.price,
      description:body.description
    }
    console.log(updated_product);

  const updatedProductObject = new Product(updated_product);
  updatedProductObject.save();
  Product.fetchAll(products=>{
  res.render(path.join(rootDir,"views","/admin/product-list.ejs"),{path:"/admin/product-list",products:products,pageTitle:"Product List"});
});
}


const ProductListController = (req,res,next) => {

Product.fetchAll((products)=>{
  res.render(path.join(rootDir,"views","/admin/product-list.ejs"),{
    products:products,
    path:"/admin/product-list",
    pageTitle:"Edit Product",
  })
});

}

exports.AdminHomePage = AdminHomePage;

exports.PostDeleteProduct = PostDeleteProduct;
exports.AddProductController =  AddProductController;
exports.ProductListController = ProductListController;
exports.PostProductController = PostProductController;
exports.PostEditProductController = PostEditProductController;
exports.EditProductController = EditProductController;
