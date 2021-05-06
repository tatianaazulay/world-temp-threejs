const express = require('express');
const app = express();
const path = require('path');
const cors=require('cors');
var fs = require('fs');
const PORT = process.env.PORT || 3000;
//process.env.PORT

//process.env.NODE_ENV => production or undefined
app.use(express.static(__dirname ))
//middleware
app.use(cors());
app.use(express.json());//req.body

if (process.env.NODE_ENV === "production"){
  //serve static content
  app.use(express.static(__dirname ))
}

//ROUTES
//app.use(express.static(__dirname ))//to public server
// app.use(express.static(__dirname + '/public'))//to public server
//app.use('/build/', express.static(path.join(__dirname, 'node_modules/three/build')));//points to folder with three.module.js which html client will load
//app.use('/jsm/', express.static(path.join(__dirname, 'node_modules/three/examples/jsm')));//extra useful Three.js modules
// app.get('./public')


// var data = fs.readFileSync('./public/1750.txt', 'utf8');
// //console.log("hello from server", data);   
// var cells = data.split('\r')
// cells=cells.map(function (el) { return el.split(','); });//will split a string on commas to create an array of words
// var keys = cells.shift();
// //console.log(cells)
//  //cities will be an array of objects
//  var cities = cells.map(function (el) {
//      var obj = {};
//      for (var i = 0, l = el.length; i < l; i++) {
//        obj[keys[i]] = isNaN(Number(el[i])) ? el[i] : +el[i];
//       // console.log(obj)
//      }  
//      return obj;
//  })
//  //console.log(cities)//json object
//  let cities1750= JSON.stringify(cities);
//      fs.writeFileSync('./public/cities1750.json',cities1750);


app.listen(PORT, () =>{
  console.log(`Server is starting on port ${PORT}`);
});
