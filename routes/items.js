const express = require('express');
const router = express.Router();
const List = require('../models/item')

//Get index
router.get('/',(req,res,next)=>{
    res.render('index',{title:'Check List'});
});

//Get list.
router.get('/list',(req,res,next)=>{
    List.find({},(err, list_item)=>{
        if(err) console.log(err);
        else{
            res.render("list.ejs",{
                lists:list_item,
                title:'Check List'
            })
        }
    }).sort({date:-1})
    console.log(`GET REQUEST RECIEVED****`);
});

 //Post
 router.post('/postItems', (req,res,next)=>{
     const newList = new List({
         name: req.body.name
     });
     newList.save()
     .then(postedList => 
        res.redirect('/list')// you redirect routes
         )
     .catch(err => res.status(404).json({
         Success:false,
         message:console.log(`FAILED TO POSTED****, STH MISSING`),
         error:err
        }));
 }) 
 
  //Delete HAVE THIS IMPLEMENTED ON THE /LIST ROUTE and page
  router.delete('/delete/:id', (req,res)=>{
     List.findById(req.params.id)
     .then(listItemId => listItemId
        .remove()
        .then(()=> res.json({Success:console.log(`ITEM DELETED`)})))
        .catch(err=>res.status(404).json({Success:console.log(`FAILED TO POSTED****, STH MISSING`)})) 
  });
// router.delete('/delete/:id', (req,res)=>{
//     List.deleteOne(myquery, function(err, obj) {
//         if (err) throw err;
//         console.log("1 document deleted");
//         List.close();
//       });
//  });
 
module.exports = router;
