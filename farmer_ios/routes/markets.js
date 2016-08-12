const saveMktRouter   = require('express').Router();
const saveMrkt        = require('../models/markets');

saveMktRouter.post('/', saveMrkt.addMarket, (req,res)=>{
  res.json(res.rows)
})

saveMktRouter.get('/:marketId', saveMrkt.getMarketByMarketId, (req,res)=>{
  res.json(res.rows)
})

module.exports = saveMktRouter
