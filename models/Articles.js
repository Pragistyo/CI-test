const mongoose = require('mongoose')
var Schema = mongoose.Schema

var articlesSchema = new Schema({
  title: String,
  content: String,
  author: String,
},{
  timestamps: { createdAt: 'created_at' , updatedAt: 'updated_at'}
})

var Articles = mongoose.model('article',articlesSchema)
module.exports = Articles
