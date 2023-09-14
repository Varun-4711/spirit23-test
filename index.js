const express = require("express");
const cors = require('cors')

const cookieParse = require('cookie-parser');
require('dotenv').config({path:'.env'});
const session = require('express-session')
const connectToMongo = require('./models/db.js');


const app = express();
app.use(express.json());
app.set('view engine','ejs');
app.use(express.static("public"));


app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParse());



app.use(function (req, res, next) {
  req.header("Access-Control-Allow-Origin", "*");
  req.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// session 
const oneDay = 1000 * 60 * 60 * 24;

app.use(
  session({
    secret: "afdhsfhsdk",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
  })
);

app.get('/admin/login',(req,res)=>{   
    if(!req.session.login)
    res.render("admin/adminLogin");
    else
    res.redirect('/admin/home');
})
// app.get('/',(req,res)=>{
//   res.render("registration/indexCodepen")
// })
// app.get('/register',(req,res)=>{
//   res.render("registration/registration_index")
// })
app.get('/admin/home',(req,res)=>{
    if(req.session.login)
    res.render("admin/adminPortal");
    else
    res.redirect('/admin/login')
})

app.use('/',require('./routes/adminAuth'));
app.use('/',require('./routes/registration'));
app.use('/',require('./routes/main'));


const PORT = 3000;

//Hello comment

app.listen(PORT,()=>{
    console.log("server live..");
    connectToMongo();
});
