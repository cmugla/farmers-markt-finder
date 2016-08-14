const express           = require('express');
const postRouter        = express.Router();

const farmerDB          = require('../models/farmer')

postRouter.post('/', farmerDB.addFarmerPost, (req,res)=>{
  res.json(res.rows)
})

postRouter.get('/', farmerDB.getPosts, (req,res)=>{
  res.json(res.rows)
})

module.exports = postRouter
