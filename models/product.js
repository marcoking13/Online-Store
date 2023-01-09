const products = [];
const fs = require("fs");
const path = require("path");
const Cart = require("./cart.js");

module.exports = class Product {

  constructor(data){
    this.id = data.id;
    this.title = data.title;
    this.image = data.image;
    this.description = data.description;
    this.price = data.price;
  }

  static delete(id){
    this.fetchAll((products) =>{
      var currentProductIndex = products.findIndex(prod => prod.id == id);
      var currentProduct = products[currentProductIndex];
      var updatedProducts = products.filter(prod => prod.id === id );
      const p = path.join(path.dirname(process.mainModule.filename),"data","products.json");
      fs.writeFile(p,JSON.stringify(updatedProducts),(err)=>{
        if(!err){
          Cart.deleteById(id,currentProduct.price);
        }

      });
    })
  }

    save(){

    this.fetchAllPublic((products) =>{
      if(this.id && products){
        console.log("products "+ products);
        const existingProductIndex = products.findIndex(prod => prod.id == this.id);
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
        const p = path.join(path.dirname(process.mainModule.filename),"data","products.json");
        fs.writeFile(p,JSON.stringify(updatedProducts),(err)=>{
          console.log(err);
        });
      }else{
          const p = path.join(path.dirname(process.mainModule.filename),"data","products.json");
          this.id = Math.floor(Math.random() * 999999999999);
          let products = [];
          fs.readFile(p,(err,fileContent)=>{
            console.log(err);

            if(!err){
              products = JSON.parse(fileContent);
            }
            products.push(this);
            console.log(this);
            fs.writeFile(p,JSON.stringify(products),(err)=>{
              console.log(err);
            });
          });
    }
  })

  }



  static findById(id,cb){
    this.fetchAll((prods)=>{

      for (var i = 0; i <prods.length; i++){

        if(prods[i].id == id){
          const found_prod = prods[i];
            cb(found_prod);

            break;
        }
      }

    })
  }

  find(id,db){
    findById();
  }




  static fetchAll(cb){
      const p = path.join(path.dirname(process.mainModule.filename),"data","products.json");
    fs.readFile(p,(err,fileContent)=>{
      console.log(err)

      if(err){
        cb( [] );
      }else{
        cb( JSON.parse(fileContent) );
      }
    })

  }
   fetchAllPublic(cb){
      const p = path.join(path.dirname(process.mainModule.filename),"data","products.json");
    fs.readFile(p,(err,fileContent)=>{
      console.log(err)

      if(err){
        cb( [] );
      }else{
        cb( JSON.parse(fileContent) );
      }
    })

  }
}
