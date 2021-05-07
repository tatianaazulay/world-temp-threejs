const express = require('express');
const app = express();
const path = require('path');
const cors=require('cors');
var fs = require('fs');
const PORT = process.env.PORT || 5000;
//process.env.PORT

//process.env.NODE_ENV => production or undefined

//middleware
app.use(cors());
app.use(express.json());//req.body

app.use(express.static(__dirname ))

if (process.env.NODE_ENV === "production"){
  //serve static content
  app.use(express.static(__dirname ))
}

//ROUTES
app.use(express.static(__dirname ))


// ====================================================================
// ====================================================================
///////THE CODE BELOW WAS USED TO GENERATE JSON FILES FROM TXT FILES
// var data = fs.readFileSync('./data/cities2013.txt', 'utf8');
// var cells = data.split('\r')
// cells=cells.map(function (el) { return el.split(','); });//will split a string on commas to create an array of words
// var keys = cells.shift();
// console.log(cells)
//  //cities will be an array of objects
//  var cities = cells.map(function (el) {
//      var obj = {};
//      for (var i = 0, l = el.length; i < l; i++) {
//        obj[keys[i]] = isNaN(Number(el[i])) ? el[i] : +el[i];
//       // console.log(obj)
//      }  
//      return obj;
//  })
//  console.log(cities)//json object
//  let cities1750= JSON.stringify(cities);
//      fs.writeFileSync('./data/cities2013.json',cities1750);
// ====================================================================
// ====================================================================

app.listen(PORT, () =>{
  console.log(`Server is starting on port ${PORT}`);
});
