const express = require('express');
const router = express.Router();
const User = require('../models/User');


router.get("/",(req,res)=>{
    res.render("index");
 });
 
 router.get("/about-us",(req,res)=>{
    res.render("about-us");
 });
 
 router.get("/events",(req,res)=>{
   res.render("events");
 });
 
 router.get("/desktop15",(req,res)=>{
      res.render("desktop15");
 });
 router.get("/success",(req,res)=>{
   res.render("success")
 })

 router.get("/privacy",(req,res)=>{
  res.render("privacy")
})

router.get("/delete",(req,res)=>{
  res.render("delete")
})
 //Attach registration page to the /register route
//  router.get("/registerr",(req,res)=>{
//      res.send("Hi, Idhar register page daaldo !");
//  });


 module.exports = router;