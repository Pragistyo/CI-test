const article = require('../models/Articles');

console.log('masuk router article');

class Article {

  static getAllArticles(req, res) {
    article.find({}).sort({ date: 'ascending' })
      .then(result => {
        res.send(result)
      })
      .catch(err => {
        res.send(err)
      })
  }
  static createArticle(req, res) {
    article.create({
      title: req.body.title,
      content: req.body.content,
      author: req.body.author
    })
      .then(result => {
        res.send(result)
      })
      .catch(err => {
        res.send(err)
      })
  }
  static getSingleArticle(req, res, dariId) {
    article.findOne({ _id: req.params.id })
      .then(result => {
        res.send(result)
      })
      .catch(err => {
        res.send(err)
      })
  }
  static getArticleBydate(req, res, dariDate) {
    article.find({ title: req.params.date })
      .then(result => {
        res.send(result)
      })
      .catch(err => {
        res.send(err)
      })
  }
  static updateArticle(req, res) {
    article.findOneAndUpdate({ _id: req.params.id }, {
      $set: {
        title: req.body.title,
        content: req.body.content,
        author: req.body.author
      }
    }, { new: true })
      .then(result => {
        res.send(result)
      })
      .catch(err => {
        res.send(err)
      })
  }
  static deleteArticle(req, res) {
    article.remove({ _id: req.params.id })
      .then(result => {
        res.send({ msg: "deleted", result: result })
      })
      .catch(err => {
        res.send(err)
      })
  }
}

module.exports = Article
