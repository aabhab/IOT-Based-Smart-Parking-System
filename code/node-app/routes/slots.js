var express = require('express');
var router = express.Router();
const Data=require('../models/Slot')

/* GET slots listing. */
router.route("/all").get(async function (req, res) {
    try{
        var data = await Data.find()
        res.status(201).send(data)
    }catch(e){
        res.status(400).send(e)
    }

})

router.route("/:slotName").get(async function (req, res) {
  var slotName = req.params.slotName
  try{
    var data = await Data.findOne({ slotName: slotName })
    console.log("data",data)
    if(data!==null){
      res.status(201).send(data)
    }else{
      res.status(400).send(e)
    }
  }catch(e){
      res.status(400).send(e)
  }

})

router.route("/reserve").post(async function (req, res) {
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
