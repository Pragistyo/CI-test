const express = require('express')
const article = require('../controllers/articleControllers')
const router  = express.Router()

router.get('/', article.getAllArticles)
router.post('/', article.createArticle)
router.get('/:id', article.getSingleArticle)
router.get('/date/:date', article.getArticleBydate)
router.put('/:id', article.updateArticle)
router.delete('/:id', article.deleteArticle)

module.exports = router
