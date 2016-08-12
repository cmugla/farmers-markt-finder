const saveMktRouter   = require('express').Router();
const saveMrkt        = require('../models/markets');

saveMktRouter.get('/:marketId', saveMrkt.getMarketByMarketId, (req,res)=>{
  res.json(res.rows)
})

saveMktRouter.get('/farmer/:farmerId', saveMrkt.getMIdFromFId, (req,res)=>{
  res.json(res.rows)
})

saveMktRouter.post('/', saveMrkt.addMarket, (req,res)=>{
  res.json(res.rows)
})

module.exports = saveMktRouter
