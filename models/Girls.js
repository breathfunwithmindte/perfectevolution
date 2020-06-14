const mongoose = require('mongoose');


const GirlSchema = new mongoose.Schema({
   auth: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true},
   Girl: {type: String, required: true},
   title: {type: String, minlength: 3, maxlength: 392, required: true},
   lovers: [
      {type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true}
   ],
   Winners: [
      {type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true}
   ],
   WhoTried: [
      {type: mongoose.Schema.Types.ObjectId}
   ]
    }, {timestamps: true});

module.exports = mongoose.model('Girls',GirlSchema);