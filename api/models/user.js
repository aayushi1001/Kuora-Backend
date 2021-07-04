const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: { type: String,required: true},
    password: { type: String, required: true},
    name: { type: String},
    gender: { type: String},
    bio: { type: String},
    year: { type: Number, required: true},
    signupas:{type: String, required: true},
    mobno: { type: Number},
    pic:{type: String,required:true},
    tag:{type:String, required:true}
});


module.exports = mongoose.model('User',userSchema);