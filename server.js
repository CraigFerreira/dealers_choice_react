const {syncAndSeed, Author, Book} = require('./db/index.js')

const express= require('express');
const app= express()
const port = process.env.PORT || 3000
const path= require('path')

app.get('/', (req, res, next)=>{res.sendFile(path.join(__dirname, 'client/index.html'))})
app.use('/src', express.static(path.join(__dirname, 'src')))
app.use('/dist', express.static(path.join(__dirname, 'dist')))
app.use(express.urlencoded({extended: false}))

const init= async()=>{
    syncAndSeed()
    app.listen(port, ()=>{
        console.log(`listening on port ${port}`)
    })
}

init()



app.get('/api/data', async(req, res)=>{
    try{
        const authors=await Author.findAll()
        console.log(authors)
        res.send(authors)
    }catch(err){
        console.log(err)
    }
})