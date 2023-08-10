const express = require('express')
const {PORT,MONGO} = require("./config")
const mongoose = require('mongoose')
const Book = require('./models/bookModel')
const app = express()
const booksRoute = require('./routes/bookRoutes')
const cors = require('cors')

// middleware
app.use(express.json())
app.use(cors())
// app.use(cors({origin:'http://localhost:3000', methods:['GET','POST','PUT','DELETE'] , allowedHeaders:['Content-Type'] }))

// get
app.get('/',(req,res)=>{
    console.log(req)
    return res.status(234).send('welcome')

})


app.use('/books', booksRoute)


mongoose.connect(MONGO).then(()=>{
    console.log("connected to db")
    app.listen(PORT,()=>{
        console.log("server started")
    })
}).catch((error)=>{
    console.log(error)
})




