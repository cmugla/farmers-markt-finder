const saveMktRouter   = require('express').Router();
const saveMrkt        = require('../models/markets');

saveMktRouter.get('/:farmerId', saveMrkt.getMarketByFarmerId, (req,res)=>{
  res.json(res.rows)
})

saveMktRouter.post('/', saveMrkt.addMarket, (req,res)=>{
  res.json(res.rows)
})

module.exports = saveMktRouter
