require('dotenv').config(); // Load environment variables from .env
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { PDFDocument, rgb } = require('pdf-lib');
const path = require('path');
const ejs = require('ejs');
const fs = require('fs');
const session = require('express-session'); // Import express-session
// const _ = require('lodash');

const app = express();

const ROOT_DIR = path.join(__dirname + 'searchCert.js');

// app.set('view engine', 'ejs');
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static("public"));

// Path to the PDF template
const templatePath = path.join(ROOT_DIR, 'pdf-templates', 'certificate-template.pdf');

const port = 3000;

// Use express-session middleware
// app.use(session({
//   secret: process.env.SESSION_SECRET, // Use the environment variable for the session secret
//   resave: false,
//   saveUninitialized: true,
// }));

// Middleware to check authentication
const authenticate = (req, res, next) => {
  if (req.session.authenticated) {
    return next(); // User is authenticated
  } else {
    return res.redirect('/login'); // Redirect unauthenticated users to login
  }
};

app.use(function (req, res, next) {
  req.header("Access-Control-Allow-Origin", "*");
  req.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// const fs = require('fs');
const csv = require('csv-parser');

const participants = [];

fs.createReadStream('participants.csv')
    .pipe(csv())
    .on('data', (row) => {
        // Assuming your CSV has 'name,' 'university,' and 'sports' columns
        const name = row.name;
        const university = row.university;
        const sports = row.sports;
        // console.log(sports)
        // Store the data in the participants array
        participants.push({ name, university, sports, certificateDownloaded: true });
    })
    .on('end', () => {
        console.log('CSV file successfully processed');
        // Now, participants array holds the data from the CSV file, including 'name,' 'university,' and 'sports' fields
    });




router.get('/search' , (req,res) => {
    res.render('search')
})

router.post('/search', (req, res) => {
    const searchQuery = req.body.searchQuery.toLowerCase(); 
    // Search for participants by name in a case-insensitive manner
    const searchResults = participants.filter(participant => {
        // Convert participant name to lowercase for comparison
        const participantName = participant.name.toLowerCase();
        return participantName.includes(searchQuery);
    });

    res.render('search-results', { participants: searchResults });
});

// routes/search.js


// Route to handle search filter
router.get('/filter', (req, res) => {
    const nameFilter = req.query.name ? req.query.name.toLowerCase() : '';
    const universityFilter = req.query.university ? req.query.university.toLowerCase() : '';
    const sportsFilter = req.query.sports ? req.query.sports.toLowerCase() : '';

    // Filter participants based on the provided criteria
    const filteredParticipants = participants.filter(participant => {
        const name = participant.name ? participant.name.toLowerCase() : '';
        const university = participant.university ? participant.university.toLowerCase() : '';
        const sports = participant.sports ? participant.sports.toLowerCase() : '';

        return (
            name.includes(nameFilter) &&
            university.includes(universityFilter) &&
            sports.includes(sportsFilter)
        );
    });

    res.render('search-results', { participants: filteredParticipants });
});


// Login route
// router.get('/login', (req, res) => {
//   res.render("login");
// });

// router.post('/login', (req, res) => {
//   const { username, password } = req.body;

//   if (username === process.env.AUTH_USERNAME && password === process.env.AUTH_PASSWORD) {
//     req.session.authenticated = true; // Set a session variable to indicate authentication
//     res.redirect('/'); // Redirect authenticated users to the index page
//   } else {
//     res.redirect('/login'); // Redirect back to login page on failed login
//   }
// });

// Secure route (index.ejs)
// app.get('/', authenticate, (req, res) => {
//   res.render("index");
// });

// Generate PDF route
// app.post('/generate-pdf', authenticate, async (req, res) => {
//   // The code for generating PDF remains the same

//       const { name, uni, sport } = req.body;

//     try {
//         // Construct the path to the PDF template
//         const templatePath = 'pdf-templates/certificate-template.pdf';
        
//         // Read the PDF template from the file system
//         const pdfData = await fs.readFileSync(templatePath);
//         const pdfDoc = await PDFDocument.load(pdfData);
//         const page = pdfDoc.getPages()[0];
    
//         // Add text to specific places on the PDF
//         page.drawText(name, { x: 100, y: 400, size: 12, color: rgb(0, 0, 0) });
//         page.drawText(uni, { x: 100, y: 300, size: 12, color: rgb(0, 0, 0) });
//         page.drawText(sport, { x: 100, y: 200, size: 12, color: rgb(0, 0, 0) });
    
//         const pdfBytes = await pdfDoc.save();
    
//         // res.setHeader('Content-Type', 'application/pdf');
//         // res.setHeader('Content-Disposition', 'inline; filename="certificate.pdf"');
//         // res.send(pdfBytes);

//         const pdfFileName = 'certificate.pdf';
//         const pdfFilePath = path.join(__dirname, 'generated-pdfs', pdfFileName);

//          await fs.writeFileSync(pdfFilePath, pdfBytes);
//          res.download(pdfFilePath, pdfFileName);



//       } catch (error) {
//         console.error('Error generating PDF:', error);
//         res.status(500).send('Failed to generate the PDF');
//       }

//   // ...

//   // Add this route only accessible to authenticated users
// });

const { URLSearchParams } = require('url');

const name = "John";
const university = "Harvard";
const sport = "Football";

const params = new URLSearchParams();
params.append('name', name);
params.append('university', university);
params.append('sport', sport);

const url = `http://example.com/?${params.toString()}`;

//console.log(url);



router.get('/download/:name/:university/:sport', async (req, res) => {
  const Name = req.params.name;
  const University = req.params.university;
  const Sport = req.params.sport;

  const name = Name.toUpperCase();
  const university = University.toUpperCase();
  const sport = Sport.toUpperCase();

  
//   console.log('Name:', name);
//   console.log('University:', university);
//   console.log('Sport:', sport);

 

  try {
    // Construct the path to the PDF template
    const templatePath = 'pdf-templates/certificate-template.pdf';
    
    // Read the PDF template from the file system
    const pdfData = await fs.readFileSync(templatePath);
    const pdfDoc = await PDFDocument.load(pdfData);
    const page = pdfDoc.getPages()[0];

    // Add text to specific places on the PDF
    page.drawText(name, { x: 760, y: 815, size: 40, color: rgb(0, 0, 0) });
    page.drawText(university, { x: 600, y: 710, size: 40, color: rgb(0, 0, 0) });
    page.drawText(sport, { x: 700, y: 605, size: 40, color: rgb(0, 0, 0) });

    const pdfBytes = await pdfDoc.save();

    // res.setHeader('Content-Type', 'application/pdf');
    // res.setHeader('Content-Disposition', 'inline; filename="certificate.pdf"');
    // res.send(pdfBytes);

    const pdfFileName = 'certificate.pdf';
    const pdfFilePath = path.join( 'generated-pdfs', pdfFileName);

     await fs.writeFileSync(pdfFilePath, pdfBytes);
     res.download(pdfFilePath, pdfFileName);



  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).send('Failed to generate the PDF');
  }


  // res.send(`Downloading ${name}'s ${sport} application from ${university}`);
});

module.exports=router;




