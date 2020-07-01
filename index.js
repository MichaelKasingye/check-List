const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const items = require('./routes/items');
const path = require('path');
const app = express();
const methodOveride = require('method-override');
if(process.env.NODE_ENV !== 'production'){
    const dotenv = require('dotenv').config();
}
//listen to Port 
const port = process.env.PORT || 3000;
//process.env.process
const mongoLdb = process.env.MONGO_URI;
//let MONGOD_MLAB = process.env.mongoURI;

  
  //Set view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');

  //Body Parser Middle ware
  app.use(bodyParser.urlencoded({ extended: false }))
  // parse application/json
  app.use(bodyParser.json());

  //Set static folder
  app.use(express.json());
  app.use(express.static(path.join(__dirname,'public')));

// Use Routes
app.use('/', items);
// use Method Overide
app.use(methodOveride('_method'));


//mongoo connect
mongoose
.connect(mongoLdb,{ useUnifiedTopology: true , useNewUrlParser: true })
.then(()=> console.log('CONNECTED TO MONGOOSE SERVER**** '))
.catch(err => console.log('FAILED TO CONNECTED TO MONGOOSE SERVER**** '+(err)));


app.listen(port, () =>{
    console.log(`SERVER STARTED AT PORT ${port}****`)
})

  
