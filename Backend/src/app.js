const express = require('express');
const cors = require('cors')
const airoutes = require('./routes/airoutes.js')

const app = express()

app.use(cors())



app.get('/',(req,res)=>{
    res.send("backend working")
})


app.use(express.json());
app.use('/ai',airoutes)

module.exports = app;