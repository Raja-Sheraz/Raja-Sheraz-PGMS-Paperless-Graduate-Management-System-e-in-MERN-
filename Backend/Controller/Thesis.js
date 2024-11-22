// const express = require('express');
const multer = require('multer');
const path = require('path');
const Thesis = require('../Models/UploadThesis');


// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (path.extname(file.originalname) !== '.pdf') {
      return cb(new Error('Only PDF files are allowed'));
    }
    cb(null, true);
  }
}).single('file');

const UploadThesis = async(req,res)=>{
    upload(req, res, async (err) => {
        if (err) {
          console.error('Error uploading file:', err);
          return res.status(400).json({ error: err.message });
        }
        // File uploaded successfully
        const { title, description, author } = req.body;
        const pdfPath = req.file.path;
    
        try {
          const newThesis = new Thesis({
            title,
            description,
            author,
            pdfPath
          });
          await newThesis.save();
          res.status(200).json({ message: 'File and data uploaded successfully' });
        } catch (error) {
          console.error('Error saving data to database:', error);
          res.status(500).json({ error: 'Internal server error' });
        }
      });
}

module.exports={
    UploadThesis,
}


