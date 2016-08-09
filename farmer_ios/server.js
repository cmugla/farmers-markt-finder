'use strict'

const express         = require('express')
const logger          = require('morgan')
const path            = require('path')
const bodyParser      = require('body-parser')
const mktsRouter      = require('./routes/mkts')

const app             = express()
const PORT            = process.env.PORT || 3000

// set up logging so that we can see what's happening
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname,'public')));

// set up server
app.listen(PORT, function(){
  console.log("server up and running on port ", PORT)
})


/* ROUTES */
app.use('/mkts', mktsRouter)

app.get('/', (req, res)=>{
  res.send('home')
})
