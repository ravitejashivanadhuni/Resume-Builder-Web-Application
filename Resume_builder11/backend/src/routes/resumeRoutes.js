const express = require('express');
const { auth } = require('../middleware/authenticate');
const { downloadPdf, downloadDoc, saveResume, getResume, uploadResume, getUserResumes, uploadToGoogleDocs } = require('../controller/resumeController');
const { enhanceResume } = require('../utils/resumeEnhancer');
const multer = require('multer');
const path = require('path');

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: function (req, file, cb) {
    const filetypes = /pdf|doc|docx/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only PDF and Word documents are allowed'));
  }
});

const router = express.Router();

// Protected routes
router.post('/upload', auth, upload.single('resume'), uploadResume);
router.post('/upload-to-google-docs', auth, upload.single('file'), uploadToGoogleDocs);
router.get('/get', auth, getResume);
router.get('/user-resumes', auth, getUserResumes);
router.post('/download-pdf', auth, downloadPdf);
router.post('/download-doc', auth, downloadDoc);
router.post('/save', auth, saveResume);

router.post('/enhance', async (req, res) => {
  try {
    const { resumeContent } = req.body;
    
    if (!resumeContent) {
      return res.status(400).json({ error: 'Resume content is required' });
    }

    const enhancedResume = await enhanceResume(resumeContent);
    res.json(enhancedResume);
  } catch (error) {
    console.error('Error in resume enhancement:', error);
    res.status(500).json({ error: 'Failed to enhance resume' });
  }
});

module.exports = router;
