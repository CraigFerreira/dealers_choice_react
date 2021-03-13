const {syncAndSeed, Author, Book, authors, books} = require('./db/index.js')

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

app.delete('/api/authors/:id', async(req, res)=>{
    const {id}= req.params
    console.log('delete id', id)
  try{
    await Author.destroy({where:{id: id}})

  }catch(err){
      console.log(err)
  }
})