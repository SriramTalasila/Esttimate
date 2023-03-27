const express = require("express");
const bodyParser = require("body-parser");


var path = require('path');
var cors = require('cors')

const app = express();

app.use(cors());
app.use(bodyParser.json());

//LowDb for local Json database
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

app.use(express.static(__dirname+'/public'));

//Setting db defaults
db.defaults({ products: [],estimates:[]})
  .write()


app.get("/products",(req,res)=>{
    var products = db.get("products");
    res.send({"products":products});
})


app.post("/products",(req,res)=>{
  var product = req.body.product;
  db.get("products")
    .push(product)
    .write();
  res.status(200).end();
})

app.get("/*",(req,res)=> res.sendFile(path.join(__dirname)));

app.listen("3000",()=>{
    console.log("Listening to port 3000...")
})