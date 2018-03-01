const mongoose = require('mongoose');
const crypto = require('crypto');
const _ = require('lodash');
const config = require('config');

// схема документа
const documentSchema = new mongoose.Schema({
  text:   {
    type:     String,
    required: "Текст отсутствует."
  },
  text_uid: {
    type:     String
  },
  exceptdomain: {
    type:     String,
  },
  excepturl: {
    type:     String,
  },  
  text_unique: {
    type:   Number,
  },   
  result_json: {
    type:     String,
  }
}, {
  timestamps: true
});


module.exports = mongoose.model('Document', documentSchema);
