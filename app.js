var express = require("express");
var bodyParser = require("body-parser");
var app = express();

var path = require("path");
var adminController = ("./controllers/admin.js");
var adminRoutes = require("./routes/admin.js");
var shopRoutes = require("./routes/shop.js");
var port = 3001;
var ejs = require("ejs");


app.use(express.static('public'))
app.set("view engine","ejs");



app.use(bodyParser.urlencoded());

app.use("/admin",adminRoutes.router);
app.use(shopRoutes);

app.use("/",(req,res,next)=>{
  console.log("App is Running");
  next();
})

app.use((req,res)=>{
  res.status(404).sendFile(path.join(__dirname,"views","404.html"));
})

app.listen(port);
