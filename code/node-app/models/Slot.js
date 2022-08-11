const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const timeSchema = new Schema({
    startTime:{
        type:Date,
        required:true
    }, 
    endTime:{
        type:Date,
        required:true
    }
})

const SlotSchema = new Schema({
    slotName: {
        type: String,
        required: true,
        trim:true
    },
    reserved: {
        type: Boolean,
        required: true,
        trim:true
    },
    times:[ {
    startTime:Date, 
    endTime:Date
    }],
    userId: {
        type: Schema.ObjectId,
        required: false,
        trim:true
    },
},{
    timestamps:true
});


const Slot = mongoose.model('slots', SlotSchema);

module.exports = Slot;
