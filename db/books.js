const {Sequelize, DataTypes}= require('sequelize');
const conn= require('./db')

const Book= conn.define('book',{
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    bookPicture:{
        type: DataTypes.STRING,
        defaultValue: 'book.jpg'
    }
})

module.exports= Book