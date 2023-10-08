
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Sport = require('../models/Sport');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport=require('passport');

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

//

const token = jwt.sign({
  data: 'Token Data',
}, 'ourSecretKey', { expiresIn: '10m' });

function verifymail(email){
  const mailConfigurations = {
  
    // It should be a string of sender/server email
    from: 'mrtwinklesharma@gmail.com',
  
    to: email,
  
    // Subject of Email
    subject: 'Email Verification',
      
    // This would be the text of email body
    text: `Hi! There, You have recently visited 
           our website and entered your email.
           Please follow the given link to verify your email
           http://localhost:3000/verify/${token} 
           Thanks`
      
  };
  
  transporter.sendMail(mailConfigurations, function(error, info){
    if (error) throw Error(error);
    console.log('Email Sent Successfully');
    console.log(info);
  });
}
var verified = false;
router.get('/verify/:token', (req, res)=>{
  const {token} = req.params;

  // Verifying the JWT token 
 
  jwt.verify(token, 'ourSecretKey', function(err, decoded) {
      if (err) {
          console.log(err);
          res.send("Email verification failed,possibly the link is invalid or expired"); 
                  
      }
      else {
          res.send("Email verifified successfully");
          verified=true;
      }
  });
});


function verifymail(token) {
  // Verify the JWT token using the same secret key and logic as in your route
  try {
      jwt.verify(token, 'ourSecretKey', function(err, decoded) {
          if (err) {
              console.log(err);
              return false; // Token verification failed
          } else {
              // Token verification succeeded
              return true; // Email is verified
          }
      });
  } catch (error) {
      console.error(error);
      return false; // An exception occurred during verification
  }
}
//

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
    // try {
    //   const { email, password } = req.body;
    //   console.log(password)
    //   const hashedPassword = await bcrypt.hash(password, 10);
  
    //   try {
    //     const user = await User.create({ email:email, password:hashedPassword });
    //     sendRegistrationEmail(email,password);
    //     // res.status(201).json({ message: 'User Created', user });
    //     res.redirect('/login');
    //   } catch (error) {
    //     // if(error.code === 11000) {
    //     //   res.status(409).json({ message: 'User already in use'});
    //     // }
    //     // res.status(500).json({ message: 'Internal server error'})
    //     console.log(error);
    //   }
  
    // } catch (error) {
    //   console.log(error);
    // }

    const { email, password, username, phone, confirmpassword } = req.body;

      if (password != confirmpassword) {
        console.log("password mismatch");
        res.send({'Error': 'Passwords don\'t match.'});
        return;
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const alreadyUser = await User.findOne({email:email});
      if(alreadyUser){
        res.send({'Error': 'User already exists.'});
      }else{
        // verifymail(email);
        const user = new User ({ email:email, password:hashedPassword, name:username, phone:phone });
        await user.save();
        res.redirect('/login');
        // if(verified){
        // }else{
        //   res.json({message:'session expired'});
        // }
        
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
        
        const user = await User.findOne({ email:email });
        console.log(user);
        if(!user){
            // res.status(401).json({ message: 'Invalid Credential'});
            res.redirect('/login');
        }
        const isPassword = await bcrypt.compare(password,user.password);
        
        if(!isPassword){
            // res.status(401).json({ message: 'Invalid Credential'});
            res.redirect('/login');
        }

        const token = jwt.sign({ userId: user._id },jwtSecret)
        res.cookie('token', token, {httpOnly: true});
        res.redirect('/dashboard');
    } catch (error) {
      console.log(error);
    }
  
  });

const passportSetup=require('../GoogleOauth/config/passport');


  router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile','email'] }));

router.get('/auth/google/redirect',passport.authenticate('google'),(req, res)=>{
    // console.log(req.route['path']);
    //console.log(req.user['username']);
    const token = jwt.sign({ userId: req.user['username'] },jwtSecret)
    res.cookie('token', token, {httpOnly: true});
    res.redirect('/dashboard');
    // res.redirect('/dashboard/');
  }
);

  router.get('/dashboard',awtMiddleware,(req,res)=>{
    res.render('registration/registration_index')
  })
  // router.post('/dashboard',awtMiddleware,async(req,res)=>{
    
  //       const {sports,captainname,captainemail,primarycontactno,secondarycontactno,university,gender,emailname,participantname} = req.body;
  //       try {
  //         const sportreg = await Sport.create({ sport:sports,captainname,captainemail,primarycontact:primarycontactno,secondarycontact:secondarycontactno,university,gender});
  //         res.redirect('/success');
  //       } catch (error) {
  //         console.log("error");
  //         console.log(error);
  //       }
  //       console.log(req.body);
  //       res.json({message: 'Resigtered Sussessfullu'})
  // })

  // router.post('/dashboard', awtMiddleware, async (req, res) => {
  //   const {
  //     sports,
  //     captainname,
  //     captainemail,
  //     primarycontactno,
  //     secondarycontactno,
  //     university,
  //     gender,
  //     emailname,
  //     participantname,
  //   } = req.body;
  
  //   try {
  //     // Create a new Sport document with participants
  //     const sportreg = await Sport.create({
  //       sport: sports,
  //       captainname: captainname,
  //       captainemail: captainemail,
  //       primarycontact: primarycontactno,
  //       secondarycontact: secondarycontactno,
  //       university: university,
  //       gender: gender,
  //       participants: emailname.map((email, index) => ({
  //         name: participantname[index],
  //         email: email,
  //       })),
  //     });
      
  //     // Redirect to a success page or respond with success message
  //     res.redirect('/success');
  //   } catch (error) {
  //     console.log('error');
  //     console.error(error);
  //     // Handle the error and possibly send an error response
  //     res.status(500).json({ message: 'Internal Server Error' });
  //   }
  
  //   console.log(req.body);
  //   // You should move this response to a suitable place in your try block
  //   // res.json({ message: 'Registered Successfully' });
  // });

  // router.post('/dashboard', awtMiddleware, async (req, res) => {
  //   const {
  //     sports,
  //     captainname,
  //     captainemail,
  //     primarycontactno,
  //     secondarycontactno,
  //     university,
  //     gender,
  //     emailname,
  //     participantname,
  //   } = req.body;
  
  //   try {
  //     if (!Array.isArray(emailname) || !Array.isArray(participantname)) {
  //       return res.status(400).json({ message: 'Invalid data format' });
  //     }
  
  //     // Check for duplicate emails in emailname array
  //     const emailSet = new Set(emailname);
  //     if (emailSet.size !== emailname.length) {
  //       return res.status(400).json({ message: 'Duplicate emails found' });
  //     }
  
  //     // Check for null or empty emails
  //     if (emailname.some(email => !email || email.trim() === '')) {
  //       return res.status(400).json({ message: 'Emails cannot be null or empty' });
  //     }
  
  //     // Create a new Sport document with participants
  //     const sportreg = await Sport.create({
  //       sport: sports,
  //       captainname: captainname,
  //       captainemail: captainemail,
  //       primarycontact: primarycontactno,
  //       secondarycontact: secondarycontactno,
  //       university: university,
  //       gender: gender,
  //       participants: emailname.map((email, index) => ({
  //         name: participantname[index],
  //         email: email,
  //       })),
  //     });
  
  //     res.redirect('/success');
  //   } catch (error) {
  //     console.log('error');
  //     console.error(error);
  //     res.status(500).json({ message: 'Internal Server Error' });
  //   }
  // });

router.post('/userDetails', async (req, res) => {
  console.log(req.body);
  if (!req.body.hasOwnProperty("email")) {
    res.send({'Error': 'Incomplete information (email)'});
    return;
  }

  if (!req.body.hasOwnProperty("password")) {
    res.send({'Error': 'Incomplete information (password)'});
    return;
  }

  const { email, password } = req.body;
  const user = await User.findOne({ email:email });

        if(!user){
            res.send({'error': 'Email not found.'});
            return;
        }

        const isPassword = await bcrypt.compare(password,user.password);
        
        if(!isPassword){
            // res.status(401).json({ message: 'Invalid Credential'});
            res.send({'error': 'Incorrect password.'});
            return;
        }
        res.send({'email': user.email, 'phone': user.phone, 'name': user.name});
});

router.post('/registerMobile', async (req, res) => {
  if (!req.body.hasOwnProperty("email")) {
    res.send({'Error': 'Incomplete information (email)'});
    return;
  }

  if (!req.body.hasOwnProperty("password")) {
    res.send({'Error': 'Incomplete information (password)'});
    return;
  }

  if (!req.body.hasOwnProperty("phone")) {
    res.send({'Error': 'Incomplete information (password)'});
    return;
  }

  if (!req.body.hasOwnProperty("name")) {
    res.send({'Error': 'Incomplete information (password)'});
    return;
  }

  const { email, password, phone, name } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

      const alreadyUser = await User.findOne({email:email});
      if(alreadyUser){
        res.send({'error': 'Email exists, try signing in.'});
      }else{
        const user = new User ({ email:email, password:hashedPassword, name:name, phone:phone });
        await user.save();
        res.send({'email': user.email, 'phone': user.phone, 'name': user.name}); 
      }
});

router.post('/registeredEvents', async (req, res) => {
  if (!req.body.hasOwnProperty("email")) {
    res.send({'Error': 'Incomplete information (email)'});
    return;
  }

  var { email } = req.body;
  email = email.toLocaleLowerCase();
  var myevents = [];

  for await (const doc of Sport.find()) {
    if (doc.captainemail.toLocaleLowerCase() === email) {
      myevents.push(doc.sport);
    } else {
      for (const participant of doc.participants) {
        if (participant.email.toLocaleLowerCase() === email) {
          myevents.push(doc.sport);
          break;
        }
      }
    }
  }

  var uniq = [...new Set(myevents)];
  res.send({'events': uniq});
});

// new dashborard
router.post('/dashboard', awtMiddleware, async (req, res) => {
  if (!req.body.hasOwnProperty("sports")) {
    res.send({'Error': 'Incomplete information (sports)'});
    return;
  }
  if (!req.body.hasOwnProperty("captainname")) {
    res.send({'Error': 'Incomplete information (captainname)'});
    return;
  }
  if (!req.body.hasOwnProperty("captainemail")) {
    res.send({'Error': 'Incomplete information (captainemail)'});
    return;
  }
  if (!req.body.hasOwnProperty("primarycontactno")) {
    res.send({'Error': 'Incomplete information (primarycontactno)'});
    return;
  }
  if (!req.body.hasOwnProperty("secondarycontactno")) {
    res.send({'Error': 'Incomplete information (secondarycontactno)'});
    return;
  }
  if (!req.body.hasOwnProperty("university")) {
    res.send({'Error': 'Incomplete information (university)'});
    return;
  }
  if (!req.body.hasOwnProperty("gender")) {
    res.send({'Error': 'Incomplete information (gender)'});
    return;
  }

    const {
      sports,
      captainname,
      captainemail,
      primarycontactno,
      secondarycontactno,
      university,
      gender,
      emailname,
      participantname,
    } = req.body;
    console.log(participantname);
    console.log(Array.isArray(participantname));
    try {
      // Check if emailname and participantname are provided
      const emailnameProvided = Array.isArray(emailname) && emailname.length > 0;
      const participantnameProvided = Array.isArray(participantname) && participantname.length > 0;
  
      // Create a new Sport document with participants if emailname or participantname is provided
      const sportData = {
        sport: sports,
        captainname: captainname,
        captainemail: captainemail,
        primarycontact: primarycontactno,
        secondarycontact: secondarycontactno,
        university: university,
        gender: gender,
      };
  
      if (emailnameProvided || participantnameProvided) {
        sportData.participants = (emailname || []).map((email, index) => ({
          name: (participantname || [])[index] || 'NA',
          email: email || 'NA',
        }));
      } else {
        sportData.participants = [{
          name: participantname || 'NA',
          email: emailname || 'NA',
        }];
      }
  
      const sportreg = await Sport.create(sportData);
  
      res.redirect('/success');
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
  

  router.get("/success",(req,res)=>{
    res.render("success")
  })
  router.get('/logout', (req,res)=>{
    res.clearCookie('token');
    //res.json({message: 'Logout successfully...'})
    res.redirect('/register');
});




module.exports = router;
