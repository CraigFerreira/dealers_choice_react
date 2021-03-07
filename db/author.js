const {Sequelize, DataTypes}= require('sequelize');
const conn= require('./db')

const Author= conn.define('author',{
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    authorPicture:{
        type: DataTypes.STRING,
        defaultValue: 'default-writer.jpg'
    }
})

module.exports= Author