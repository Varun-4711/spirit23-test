const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Sport = require('../models/Sport');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;

// check login middleware

const awtMiddleware = (req,res,next)=>{
    const token = req.cookies.token;

    if(!token){
        res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const decoded = jwt.verify(token,jwtSecret);
        req.userId=decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
    }
}

const nodemailer = require('nodemailer');



// Create a transporter using your email service
const transporter = nodemailer.createTransport({
  service: 'gmail', // e.g., 'Gmail'
  auth: {
    user: 'utkarshraj936@gmail.com',
    pass: 'eyhhcbnlbqwtplqw',
  },
});

function sendRegistrationEmail(email,pass) {
  // Define email content
  const mailOptions = {
    from: 'noreply.com', // Sender's email address
    to: email, // Recipient's email address
    subject: 'Registration Successful', // Email subject
    text: 'Thank you for registering with Spirit 2023.', // Plain text version of the email
    html: `<p>Thank you for registering with <b> Spirit 2023 </b>, north-east India's largest sports festival hosted by IIT Guwahati.<br>
     Your account information for login : <br>
      email :${email} <br>password : ${pass} <br>kindly do not share it with any one </p> ` , // HTML version of the email
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending registration email:', error);
    } else {
      console.log('Registration email sent:', info.response);
    }
  });
}


router.get('/register', (req,res) =>{
    try {
      res.render('registration/indexCodepen');
      console.log("AA gaya")
    } catch (error) {
      console.log(error);
    }
})
/**
 * POST /
 * User - Register
*/
router.post('/register', async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log(password)
      const hashedPassword = await bcrypt.hash(password, 10);
  
      try {
        const user = await User.create({ email, password:hashedPassword });
        sendRegistrationEmail(email,password);
        // res.status(201).json({ message: 'User Created', user });
        res.redirect('/login');
      } catch (error) {
        if(error.code === 11000) {
          res.status(409).json({ message: 'User already in use'});
        }
        res.status(500).json({ message: 'Internal server error'})
      }
  
    } catch (error) {
      console.log(error);
    }
  });


  //GET
//User - login page

router.get('/login', async (req, res) => {
  try {

    res.render('registration/indexCodepen');
  } catch (error) {
    console.log(error);
  }

});

//POST
//User - check login 

router.post('/login', async (req, res) => {
    try {
        const { email,password } = req.body;
        
        const user = await User.findOne({ email });
        
        if(!user){
            res.status(401).json({ message: 'Invalid Credential'});
        }
        const isPassword = await bcrypt.compare(password,user.password);
        
        if(!isPassword){
            res.status(401).json({ message: 'Invalid Credential'});
        }

        const token = jwt.sign({ userId: user._id },jwtSecret)
        res.cookie('token', token, {httpOnly: true});
        res.redirect('/dashboard');
    } catch (error) {
      console.log(error);
    }
  
  });

  router.get('/dashboard',awtMiddleware,(req,res)=>{
    res.render('registration/registration_index')
  })
  router.post('/dashboard',awtMiddleware,async(req,res)=>{
        // var sports = req.body.sports;
        // var university = req.body.university;
        // var gender = req.body.gender;
        // var par = req.body.participantname;
        const {sports,captainname,captainemail,primarycontactno,secondarycontactno,university,gender,emailname,participantname} = req.body;
        try {
          const sport = await Sport.create({ sports,captainname,captainemail,primarycontactno,secondarycontactno,university,gender,emailname,participantname });
        } catch (error) {
          console.log(error);
        }
        console.log(req.body);
        res.json({message: 'Resigtered Sussessfullu'})
  })


  router.get('/logout', (req,res)=>{
    res.clearCookie('token');
    //res.json({message: 'Logout successfully...'})
    res.redirect('/register');
});




module.exports = router;