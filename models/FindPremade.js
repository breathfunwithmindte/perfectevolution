const mongoose = require('mongoose');


const FindPremadeSchema = new mongoose.Schema({

   Auth: {type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true},
   NeedPremade: {type: Array, required: true},
   PrefPlaystyle: {type: Array, required: true},
   expireAt: { type: Date, default: Date.now() + 36*36,  required: true }
   }, {timestamps: true});

module.exports = mongoose.model('Premades', FindPremadeSchema);