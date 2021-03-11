const db= require('./db');

const Author= require('./author')
const Book= require('./books');
const { model } = require('./db');

const authors = [
    { name: 'Tolkien', authorPicture: 'http://www.gstatic.com/tv/thumb/persons/160610/160610_v9_bb.jpg' },
    { name: 'Arthur Conan Doyle', authorPicture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Conan_doyle.jpg/1200px-Conan_doyle.jpg'},
    { name: 'Charles Dickens', authorPicture: 'https://upload.wikimedia.org/wikipedia/commons/a/aa/Dickens_Gurney_head.jpg' }
];



const books = [
    { name: 'Beowulf', bookPicture: 'book.jpg' },
    { name: 'The Lord of the Rings', bookPicture: 'book.jpg'},
    { name: 'Sherlock Holmes', bookPicture: 'book.jpg' },
    { name: 'Oliver Twist', bookPicture: 'book.jpg' },
    { name: 'A Tale of Two Cities', bookPicture: 'book.jpg' }
];

Book.belongsTo(Author)
Author.hasMany(Book)

const syncAndSeed= async()=>{
    await Author.sync({force:true})
    await Book.sync({force: true})
    const [Tolkien, ArthurConanDoyle, CharlesDickens] = await Promise.all(
        authors.map(({ name, authorPicture }) => 
        Author.create({ name, authorPicture }))
    );

    const [Beowulf, TheLordoftheRings, SherlockHolmes,
        OliverTwist, ATaleofTwoCities] = await Promise.all(
        books.map(({ name, bookPicture }) => 
        Book.create({ name, bookPicture }))
    );

    Beowulf.authorId= Tolkien.id
    TheLordoftheRings.authorId= Tolkien.id
    SherlockHolmes.authorId= ArthurConanDoyle.id
    OliverTwist.authorId= CharlesDickens.id
    ATaleofTwoCities.authorId= CharlesDickens.id


    await Promise.all([Beowulf.save(), 
        TheLordoftheRings.save(), 
        SherlockHolmes.save(), 
        OliverTwist.save(), 
        ATaleofTwoCities.save() ]) 
}

// syncAndSeed();


module.exports= {
    syncAndSeed,
        Author,
        Book
}