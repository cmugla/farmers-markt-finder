const express           = require('express');
const users             = express.Router();

const tokenService      = require('../service/tokenService')

/* get the database middleware */
const userService = require('../models/farmer')

const sendError = (err,req,res,next)=>res.status(500).json(err)

users.post('/',
    userService.createUser,
    (req,res) => res.status(201).json({data: 'success'}).end()
)

users.use( tokenService.validateToken )

module.exports = users;
