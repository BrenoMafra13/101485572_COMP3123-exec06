const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  noteTitle: {
    type: String, required: true, trim: true
  },
  noteDescription: {
    type: String, required: true, trim: true
  },
  priority: {
    type: String,
    enum: ['HIGH', 'MEDIUM', 'LOW'], required: true
  },
  dateAdded: {
    type: String, required: true
  },
  dateUpdated: {
    type: String, required: true
  }
});

module.exports = mongoose.model('Note', noteSchema);
