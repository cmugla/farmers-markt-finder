const saveMktRouter   = require('express').Router();
const saveMrkt        = require('../models/markets');

saveMktRouter.get('/farmer/posts/:farmer_id', saveMrkt.getPostsByFId, (req,res)=>{
  res.json(res.rows)
})

saveMktRouter.put('/farmer/removeMarket', saveMrkt.deleteMarket, (req,res)=>{
  res.json(res.rows)
})

saveMktRouter.get('/farmer/:farmerId', saveMrkt.getMDataFromFId, (req,res)=>{
  res.json(res.rows)
})

saveMktRouter.get('/:marketId', saveMrkt.getMarketByMarketId, (req,res)=>{
  res.json(res.rows)
})

saveMktRouter.post('/', saveMrkt.addMarket, (req,res)=>{
  res.json(res.rows)
})

module.exports = saveMktRouter
