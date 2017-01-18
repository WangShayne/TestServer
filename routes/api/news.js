var express = require('express');
var router = express.Router();
var fs = require('fs');
var dataUrl = "data/news/top.json";

router.get('/',function(req,res,next){
  console.log(req.query);
  var type = req.query.type;
  if(type === "top"||type === "shehui"||type === "guonei"||type === "guoji"||type === "junshi"||type === "keji"||
     type === "shishang"||type === "tiyu"||type === "yule"){
       dataUrl = "data/news/"+type+".json";
     }
  let data = JSON.parse(fs.readFileSync(dataUrl))
  // console.log(res);
  res.send(data)
})

module.exports = router;