const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
   Title: {type: String, required: true, maxlength: 92},
   ImageURL: { type: String, required: true},
   catergory: {type: String, required: true},
   price: {type: String, required: true},
   description: {type: String, maxlength: 639}
})

const ComboSchema = new mongoose.Schema({
   description: {type: String, maxlength: 1940, required: true},
   initialPrice: {type: Number, required: true},
   price: {type: String, required: true}
})


const DeliverySchema = new mongoose.Schema({
   CoverImage: {type: String, required: true},
   AvatarImage: {type: String, required: true},
   Title: {type: String, required: true, maxlength: 192},
   Categories: {type: Array},
   CatergoriesSchema: [ProductSchema],
   ComboSchema: [ComboSchema],
   minDeliveryCost: {type: Number, required: true, default: 3},
   timeDelivery: {type: Number, required: true, default: 23},
   StoreType: {type: String, required: true},
   owner: {type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true, default: '5ec855fbcacbc22fd4bca28c'},
   fans: [
      {type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true }
   ]
   });

module.exports = mongoose.model('Delivery', DeliverySchema);