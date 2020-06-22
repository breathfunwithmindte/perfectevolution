const mongoose = require('mongoose');
const bcrypt = require('bcrypt')


const ProfileSchema = new mongoose.Schema({
   user: {type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true},
   username: {type: String, required: true},
   fullName: {type: String, maxlength: 34, minlength: 5, required: false},
   profileImage: {type: String, required: true, default: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRwpHgjVzqyxC9fSMfC0fOP2goWLAtetwh8_UYucxL8WHIknr_3UFEWHuwIldB2t89AWkGPod1fKGWZKIJb3LLiJeZHQWhoad5EhZBCmkawzWCH3eFJSKorB9b6uleT6R-uw4RLigO7wm5zKwS1xHk5Kdcga_f2FIt-A0yLDjVXvh-uTbRFLzEa1vZtuprZmGqGGu_vKb0xC21X8aKalPTI44YR4yUpTGLOCS0zkstr7u6PwDfUYW228PSuZVjEQDVgfnzqhbWJa9RNIRms6ysQE0xzpcGwRIFe8d4CGk8y6H-qdDDJddw4tk4j-wbFZBWKNV0wNYOkbdgQ8fFwdAb0TEg1rPNADHFTsVUbMqFmctalEMvz1lyNr4hECaNp9jZtoCziqjZkl7w2eBfkagYKDohVHyUMysdzlDyCsF_NO_yonU42-Bde8Oojn5CaP9GcxttabQ&usqp=CAU"},
   profileImages: [{type: String, required: false}],
   coverImage: {type: String, required: true, default: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSPuuHT3zxCKvW7SHxn8JJPrzHdM56GfXEAkV_HjIE7RTj5iqW7&usqp=CAU"},
   age: {type: Number, required: true, default: 18},
   statusContent: {type: String, required: true, default: "No status yet !!"}
}, {timestamps: true})

module.exports = mongoose.model('Profiles', ProfileSchema);