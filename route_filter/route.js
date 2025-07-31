const express = require('express');
const router = express.Router();
// const demopostController = require('../controller/demopost');

router.get('/',(req,res)=>{
  return res.status(200).json({
    success:true,
    message:"data fetched successfully",
    data:null
  }) 
});
router.post('/',(req,res)=>{
    return res.status(200).json({
        success:true,
        message:"data posted successfully",
        data:null
    })
});

module.exports = router;
