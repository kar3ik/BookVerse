
const express = require('express')
const Book =require('../models/bookModel')
const router = express.Router()

// post
router.post('/', async (req,res)=>{
    try{
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ){
            res.status(400).send({message:"send all data"})

        }
        const newBook ={
            title:req.body.title,
            author:req.body.author,
            publishYear:req.body.publishYear

        }
        const book = await Book.create(newBook)
        return res.status(201).send(book)

    }catch(error){
        console.log(error.message)
        res.status(500).send({message:error.message})
    }

})

// get all books
router.get('/',async(req,res)=>{
    try{
        const books = await Book.find({})
        return res.status(200).json({
            count : books.length,
            data: books
        })

    }catch(error){
        console.log(error.message)
        res.status(500).send({message:error.message})
    }

})


// get one book
router.get('/:id',async(req,res)=>{
    
    try{
        const {id} = req.params
        const book = await Book.findById(id)
        return res.status(200).json({book})

    }catch(error){
        console.log(error.message)
        res.status(500).send({message:error.message})
    }

})

//update
router.put('/:id',async(req,res)=>{
    
    try{
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ){
            res.status(400).send({message:"send all data"})
        }
        const {id} = req.params
        const result = await Book.findByIdAndUpdate(id,req.body)
        if(!result){
            returnmres.status(404).send({message:"Book not found"})

        }
        return res.status(200).send({message: "book updated"})
    }catch(error){
        console.log(error.message)
        res.status(500).send({message:error.message})
    }

})

// delete
router.delete('/:id',async (req,res)=>{
    try{
        const {id} = req.params
        const result = await Book.findByIdAndDelete(id)
        if(!result){
            returnmres.status(404).send({message:"Book not found"})

        }
        return res.status(200).send({message: "book deleted"})


    }catch(error){
        console.log(error.message)
        res.status(500).send({message:error.message})
    }
})



module.exports = router