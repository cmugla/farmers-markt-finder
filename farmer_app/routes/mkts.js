const mktRouter = require('express').Router();
const apiData   = require('../models/apiData');

mktRouter.get('/', apiData.getData, (req, res)=>{
  res.json(res.results)
})

module.exports = mktRouter
