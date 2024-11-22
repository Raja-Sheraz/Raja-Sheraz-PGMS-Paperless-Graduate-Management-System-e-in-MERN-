const mongoose = require('mongoose');

const thesisSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  author: { type: String, required: true },
  pdfPath: { type: String, required: true }
});

const Thesis = mongoose.model('Thesis', thesisSchema);

module.exports = Thesis;
