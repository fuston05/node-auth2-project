const express = require('express');
const router = express.Router();

const users = require('./user_model');

//get all users
router.get('/', (req, res) => {
  const dept= req.decodedToken.department;
  users.getAll(dept)
    .then(users => {
      console.log('users: ', users);
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json({ error: "Could not process your request" });
    })
});//end router get all

//find user by id
router.get('/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  users.findById(userId)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      res.status(500).json({ error: "Could not process your request" });
    })
});//end router get byid

//delete a user
router.delete('/:id', (req, res) => {
  const delId = parseInt(req.params.id);
  users.remove(delId)
    .then(user => {
      res.status(200).json(`User: ${user.username} seccessfully deleted`);
    })
    .catch(error => {
      res.status(500).json({ error: "Could not process your request" });
    })
});//end router delete

module.exports = router;