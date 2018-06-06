const User = require('../models/User')

console.log('masuk user controllers')
class UserController{

  static createUser (req, res) {
    User.create({
      username: req.body.username,
      password: req.body.password
    })
    .then(user => {
      res.send(user)
    })
    .catch(err => {
      res.send(err)
    })
  }
}

module.exports = UserController
