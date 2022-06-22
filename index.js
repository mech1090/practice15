const express = require('express')
const cors = require('cors')
const config = require('config')
const { mongo, default: mongoose } = require('mongoose')
const userPage = require('./route/user.route')
require('./db')


const app = express()

app.use(express())
app.use(cors())
app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use('/user',userPage)

app.set('view engine','pug')
app.set('views','./views')

app.get('/',(req,res)=>{
    return res.send('OOOK')
})

app.get('*',(req,res)=>{
    return res.send('BAD_REQUEST')
})

port = config.get('port') || 8080

mongoose.connection.once('open',()=>{
    app.listen(port,()=>{
        console.log(`Server running on port ${port}`)
    })
    console.log('DB connected')
})



