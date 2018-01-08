const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
const app = require('../app');

chai.use(chaiHttp)

const newArticle = {
  title: 'Testing TDD',
  content: 'content TDD',
  author: 'dimsum'
}

const editArticle = {
  title: 'Selesai TDD',
  content: 'updated content',
  author: 'updated author'
}

var params = null
var date = null

// console.log(newArticle);
describe('test post new article', () => {
  it('should be post data of new article', (done) => {
    // console.log(newArticle);
    chai.request(app)
      .post('/articles')
      .send(newArticle)
      .end((err, response) => {
        // console.log(response);
        params = response.body._id
        date = response.body.created_at
        // console.log('=============='+date);
        response.status.should.be.equal(200)
        response.body.should.be.an('object')
        response.body.should.have.property('title')
        response.body.should.have.property('content')
        response.body.should.have.property('author')
        response.body.title.should.not.be.equal(null)
        response.body.content.should.not.be.equal(null)
        response.body.author.should.not.be.equal(null)
        response.body.title.should.equal('Testing TDD')
        response.body.content.should.equal('content TDD')
        response.body.author.should.equal('dimsum')
        done()
      })
  })
})

describe('get all Article data endpoint', () => {
  it('should get all data', (done) => {
    chai.request(app)
      .get('/articles')
      .end((err, response) => {
        response.status.should.be.equal(200)
        response.body.should.be.an('array')
        response.body.length.should.be.above(0)
        done()
      })
  })
})

describe('get single Article data by ID endpoint', () => {
  it('should get single data by params', (done) => {
    chai.request(app)
      .get(`/articles/${params}`)
      .end((err, response) => {
        // console.log(response)
        response.status.should.be.equal(200)
        response.body.should.be.an('object')
        response.body.should.have.property('title')
        response.body.should.have.property('content')
        response.body.should.have.property('author')
        response.body.title.should.equal('Testing TDD')
        response.body.content.should.equal('content TDD')
        response.body.author.should.equal('dimsum')
        done()
      })
  })
})

describe('get single Article data by DATE endpoint', () => {
  it('should get all data by DATE', (done) => {
    chai.request(app)
      .get(`/articles/date/${date}`)
      .end((err, response) => {
        response.status.should.be.equal(200)
        response.body.should.be.an('array')
        done()
      })
  })
})

describe('update single data by ID', () => {
  it('should UPDATE single data by ID', (done) => {
    chai.request(app)
      .put(`/articles/${params}`)
      .send(editArticle)
      .end((err, response) => {
        response.status.should.be.equal(200)
        response.body.should.be.an('object')
        response.body.should.have.property('title')
        response.body.should.have.property('content')
        response.body.should.have.property('author')
        response.body.title.should.have.be.equal('Selesai TDD')
        response.body.content.should.have.be.equal('updated content')
        response.body.author.should.have.be.equal('updated author')
        done()
      })
  })
})

describe('delete single Article by ID endpont', () => {
  it('should DELETE single data by ID', (done) => {
    chai.request(app)
      .delete(`/articles/${params}`)
      .end((err, response) => {
        // console.log(response)
        response.status.should.be.equal(200)
        response.body.should.be.an('object')
        response.body.should.have.property('msg')
        response.body.should.have.property('result')
        response.body.result.should.have.property('ok')
        response.body.result.should.have.property('n')
        response.body.msg.should.be.equal('deleted')
        response.body.result.ok.should.be.equal(1)
        response.body.result.n.should.be.equal(1)
        done()
      })
  })
})
