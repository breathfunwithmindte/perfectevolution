const express = require('express');
const DeliveryRouter = express.Router();
const Delivery = require('../models/Delivery');

DeliveryRouter.post('/new', async (req,res) => {
   try{
      newDelivery = new Delivery({CoverImage: req.body.cover, AvatarImage: req.body.avat, StoreType: req.body.type, Title: req.body.title})
      let createDelivery = await newDelivery.save()
      return res.status(201).json({message: {msgBody: "new store was created", msgError: false, createDelivery}})

   }catch(err){
      return res.status(400).json({message: {msgBody: "smth went wrong", msgError: true}})
   }
})

DeliveryRouter.post('/addprod', async (req, res) => {
   try{
      let addproducts = await Delivery.updateMany(
         {"StoreType": "coffee"}, {
            $push: {
               CatergoriesSchema: {Title: req.body.title, ImageURL:req.body.cover, catergory: req.body.ctgr,
                   price: req.body.price, description: req.body.description}
            },
            $addToSet: {
               Categories: {$each: [req.body.ctgr]}
            }
         }
      )
      let updateddel = await Delivery.find({"StoreType": "coffee"})
   return res.status(201).json({message: {msgBody: "product added", msgError: false, addproducts, updateddel}})

   }catch(err){
      return res.status(400).json({message: {msgBody: "smth went wrong", msgError: true, err}})
   }
})

DeliveryRouter.get('/shops', (req,res) => {
   Delivery.find({}).then(shops => res.status(200).json({message: {msgBody: "all shops", msgError: false, shops}}))
   .catch(err => res.status(400).json({message: {msgBody: "smth went wrong", msgError: true}}))
})

DeliveryRouter.post('/shopOne/:id', (req,res) => {
   Delivery.findOne({"_id": req.params.id})
   .populate("owner", ["profileImage", "username"])
   .then(shop => res.status(200).json({message: {msgBody: "shops", msgError: false, shop}}))
   .catch(err => res.status(400).json({message: {msgBody: "smth went wrong", msgError: true}}))
})


module.exports = DeliveryRouter;