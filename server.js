const {syncAndSeed, Author, Book} = require('./db/index.js')

const express= require('express');
const app= express()
const port = process.env.PORT || 3000
const path= require('path')

app.get('/', (req, res, next)=>{res.sendFile(path.join(__dirname, 'client/index.html'))})
app.use('/src', express.static(path.join(__dirname, 'src')))
app.use('/dist', express.static(path.join(__dirname, 'dist')))
// app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const init= async()=>{
    syncAndSeed()
    app.listen(port, ()=>{
        console.log(`listening on port ${port}`)
    })
}

init()



app.get('/api/data', async(req, res)=>{
    try{
        const authors=await Author.findAll({include: [{model: Book}]})
        console.log(authors)
        res.send(authors)
    }catch(err){
        console.log(err)
    }
})

app.delete('api/delete', async(req, res)=>{
    const deleteId= req.body
    console.log('delete id', deleteId)
  try{
    // const authorToDelete= await Author.find({where:{id: deleteId}})
  }catch(err){
      console.log(err)
  }
})