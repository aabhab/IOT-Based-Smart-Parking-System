const mongoose=require('mongoose')
require('dotenv').config()

url=process.env.URL
mongoose.connect('mongodb+srv://karthik003:karthik003@cluster0.fzjgg.mongodb.net/ParkingSys?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    // useCreateIndex:true,
    useUnifiedTopology:true
})
