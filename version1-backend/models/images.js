var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var imageSchema = new Schema({
  fieldname: {
      type: String,
      required: true
  },
  originalname: {
      type: String
  },
  encoding: {
      type: String
  },
  mimetype: {
      type: String
  },
  destination: {
      type: String
  },
  filename: {
      type: String
  },
  path: {
      type: String    
  },
  size:{
    type: Number
  }
}, {
  timestamps: true
});

var Images = mongoose.model('Image', imageSchema);
module.exports = Images ;


