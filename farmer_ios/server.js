'use strict'
const env             = process.env.NODE_ENV || 'development';
const DEV             = env==='development';
const dotenv          = (DEV) ? require('dotenv').config() : undefined;

const express         = require('express')
const logger          = require('morgan')
const path            = require('path')
const bodyParser      = require('body-parser')
const mktsRouter      = require('./routes/mkts')
const userApiRouter   = require('./routes/userApi')
const userRouter      = require('./routes/users')

const app             = express()
const PORT            = process.env.PORT || 3000

app.set('superSecret', 'my super secret word')

// set up logging so that we can see what's happening
app.use(logger('dev'))
app.use(bodyParser.json())

// set up server
app.listen(PORT, function(){
  console.log("server up and running on port ", PORT)
})


/* ROUTES */
app.use('/mkts',          mktsRouter)
app.use('/userapi',       userApiRouter)
app.use('/userapi/users', userRouter)

app.get('/', (req, res)=>{
  res.send('home')
})
