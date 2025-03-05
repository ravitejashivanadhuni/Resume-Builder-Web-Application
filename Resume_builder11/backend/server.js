// const express = require("express");
// const cookieParser = require("cookie-parser");
// const cors = require("cors");
// const rateLimit = require('express-rate-limit');
// const app = express();
// require("dotenv").config();

// // Rate limiting
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100 // limit each IP to 100 requests per windowMs
// });

// app.use(limiter);
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
// require("./src/config/db");

// const port = process.env.PORT || 9000;

// // Updated CORS configuration
// const corsOptions = {
//   origin: process.env.NODE_ENV === 'production' 
//     ? process.env.FRONTEND_URL 
//     : ['http://localhost:3000', 'http://localhost:5173'],
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
//   exposedHeaders: ['set-cookie']
// };

// app.use(cors(corsOptions));
// const authRoute = require("./src/routes/authroutes");
// const resumeRoutes = require("./src/routes/resumeRoutes");

// //apis
// app.use("/api/v1/auth", authRoute);
// app.use("/api/v2/resume", resumeRoutes);

// app.get("/", (req, res) => res.send("Hello World!"));

// // Global error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(err.status || 500).json({
//     success: false,
//     message: err.message || 'Internal Server Error',
//     ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
//   });
// });

// // 404 handler
// app.use((req, res) => {
//   res.status(404).json({
//     success: false,
//     message: 'Route not found'
//   });
// });

// app.listen(port, () => console.log(`Server running on port ${port}!`));


const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const multer = require("multer");
const { google } = require("googleapis");
const fs = require("fs");

const app = express();
require("dotenv").config();

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
require("./src/config/db");

const port = process.env.PORT || 9000;

// Updated CORS configuration
const corsOptions = {
  origin: true, // Allow all origins in development
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
const authRoute = require("./src/routes/authroutes");
const resumeRoutes = require("./src/routes/resumeRoutes");

//apis
app.use("/api/v1/auth", authRoute);
app.use("/api/v2/resume", resumeRoutes);

app.get("/", (req, res) => res.send("Hello World!"));

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

// ------------------------- For File Edit-----------------

const upload = multer({ dest: "uploads/" });

// Load Google Service Account Credentials
const KEYFILE_PATH = "./service-account.json"; // Replace with your JSON file
const SCOPES = ["https://www.googleapis.com/auth/drive.file"];

// Google Drive Folder ID
const FOLDER_ID = "1FAvFWMCONQ-SToyBmskzLrs0Nb2nfk9h"; // Replace with your Google Drive Folder ID

const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILE_PATH,
  scopes: SCOPES,
});

const drive = google.drive({ version: "v3", auth });

// Upload DOCX File to Google Drive
app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const fileMetadata = {
      name: req.file.originalname,
      parents: [FOLDER_ID], // Save in shared folder
      mimeType:
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    };

    const media = {
      mimeType: req.file.mimetype,
      body: fs.createReadStream(req.file.path),
    };

    const response = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: "id",
    });

    // Make file publicly accessible
    await drive.permissions.create({
      fileId: response.data.id,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });

    // Return Google Docs link
    res.json({ fileId: response.data.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//  ---------------------------------------------------

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

app.listen(port, () => console.log(`Server running on port ${port}!`));
