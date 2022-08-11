var express = require('express');
var router = express.Router();
const Data=require('../models/User')

// Get Users list 
router.route("/get").get(async function (req, res) {
    const dbConnect = req.db;
    dbConnect
      .collection("Users")
      .find({}).limit(50)
      .toArray(function (err, result) {
        if (err) {
          res.status(400).send("Error fetching listings!");
       } else {
          res.json(result);
        }
});

})

// Get User details
router.route("/findByEmail/:email").get(async function (req, res) {
	var email = req.params.email;
    try{
        var data = await Data.findOne({ email: email })
        if(data!==null){
            res.status(201).send(data)
        }else{
            res.status(400).send(e)
        }
    }catch(e){
        res.status(400).send(e)
    }

})


// Post New User
router.route("/post").post(async function (req, res) {
    const data=new Data(req.body)
    console.log("data",data)
    try{
        await data.save()
        res.status(201).send()
    }catch(e){
        res.status(400).send(e)
    }
})

  
module.exports = router;
