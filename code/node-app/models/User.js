const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim:true
    },
    lastName: {
        type: String,
        required: true,
        trim:true
    },
    mobile: {
        type: String,
        required: false,
        trim:true
    },
    email: {
        type: String,
        required: true,
        trim:true
    },
    carNo:{
        type:String,
        required:false,
        trim:true
    },
    reserved:{
        type:Boolean,
        required:false,
        trim:true
    },
},{
    timestamps:true
});

const User = mongoose.model('users', UserSchema);

module.exports = User;
