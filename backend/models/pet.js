const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  species: { 
    type: String, 
    required: true 
  },
  age: { 
    type: Number, 
    required: true 
  },
  description: { 
    type: String 
  },

  owner: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  status: {
    type: String,
    enum: ['available', 'unavailable'],
    default: 'available'
  }
});

const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;