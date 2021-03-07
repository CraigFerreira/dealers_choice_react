const db= require('./db');

const Author= require('./author')
const Book= require('./books');
const { model } = require('./db');

const authors = [
    { name: 'Tolkien', authorPicture: 'default-writer.jpg' },
    { name: 'Arthur Conan Doyle', authorPicture: 'default-writer.jpg'},
    { name: 'Charles Dickens', authorPicture: 'default-writer.jpg' }
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