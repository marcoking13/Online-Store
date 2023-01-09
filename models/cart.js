var path = require("path");
var fs = require("fs");

var p = path.join(path.dirname(process.mainModule.filename),"data","cart.json");

class Cart{

  static deleteById(id,productPrice){
      fs.readFile(p,(err,fileContent)=>{
        var cart = JSON.parse(fileContent);
        var updatedCart = {...cart};
        console.log(updatedCart.products);

        var productIndex = updatedCart.products.findIndex(prod=> prod.id == id);
        console.log(productIndex);


        updatedCart.totalPrice -= parseFloat(updatedCart.products[productIndex].price) * parseFloat(updatedCart.products[productIndex].qty);
        updatedCart.products.pop(productIndex);
        console.log(updatedCart);
        fs.writeFile(p,JSON.stringify(updatedCart),(err)=>{
            if(err){
              console.log(err);
            }
        })

      })
  }

  static getCart(cb){
    fs.readFile(p,(err,fileContent)=>{
      if(!err){
        var cart = JSON.parse(fileContent);
        cb(cart)
      }else{
        cb(null)
      }

  })
}


  static addProduct(id,price){
    fs.readFile(p,(err,fileContent)=>{
      let cart = {products:[],totalPrice:0};
      if(!err && err !== null){
        cart = JSON.parse(fileContent);
      }
      const existingProductIndex = cart.products.findIndex(prod=> prod.id == id);
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;
      console.log(existingProduct);
      if(existingProduct){
        updatedProduct = {...existingProduct};

        updatedProduct.qty = parseInt(updatedProduct.qty + 1)  ;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      }else{
        updatedProduct = {id: id, qty:1,price:price};
        cart.products = [...cart.products,updatedProduct];

      }
      cart.totalPrice  = parseFloat(cart.totalPrice) + parseFloat(price);
      fs.writeFile(p,JSON.stringify(cart),err=>{
        console.log(err);
      })

    })
  }
}



module.exports = Cart;
