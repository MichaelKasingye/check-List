const express = require('express');
const router = express.Router();
const List = require('../models/item')

//Get index
router.get('/',(req,res,next)=>{
    res.render('index',{title:'Check List'});
});

//Get list
router.get('/list',(req,res,next)=>{
    res.render('list',{title:'Check List Items'});
});

//@access Public
router.get('/getItems',(req,res)=>{
    List.find()
        .sort({date:-1})
        .map( function(u) { return u.name; } )
        .then(items => res.json(items))
        console.log(`REQUEST RECIEVED****`);
    });

// //@access Public
// router.get('/getItems',(req,res)=>{
//     List.find()
//         .sort({date:-1})
//         .then(items => res.json(items));
//         console.log(`REQUEST RECIEVED****`);
//     });


 //Post
 router.post('/postItems', (req,res,next)=>{
     const newList = new List({
         name: req.body.name
     });
     newList.save()
     .then(postedList => 
        // res.send({
        // pageMessage:'Sent***',
        //  message: console.log(`REQUEST POSTED****`),
        //  })
        res.redirect('/')// you redirect routes
         )
         
      //.render('index',{pageMessage:'Item posted'})
     .catch(err => res.status(404).json({
         Success:false,
         message:console.log(`FAILED TO POSTED****, STH MISSING`)
        }));
 })       
module.exports = router;