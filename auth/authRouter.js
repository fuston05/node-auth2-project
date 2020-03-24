const express= require('express');
const router= express.Router();
const bcrypt= require('bcrypt');
const jwt= require('jsonwebtoken');
const {jwtSec}= require('../sec/sec');

const users= require('../users/user_model');

//register a new user
router.post('/register', (req, res) => {
  const userInfo= req.body;
  const rounds= parseInt(process.env.ROUNDS) || parseInt(9);

  //hash the password
  const hash= bcrypt.hashSync(userInfo.password, rounds);

  //assign password
  userInfo.password= hash;

  users.add(userInfo)
  .then(user => {
    res.status(201).json(user);
  })
  .catch(error => {
    console.log('error', error)
    res.status(500).json({error: "Could not process your request"});
  })
});//end register

router.post('/login', (req, res) => {
  const {username, password}= req.body;
  users.findBy({username})
  .first()
  .then( user => {
    // if we have a user and the password matches the hash
    if(user && bcrypt.compareSync(password, user.password)){
      //generate a token
      const token= generateToken(user);
      res.status(200).json({
        message: `Welcome ${user.username}!`, token
      });
    }else{
      res.status(401).json({message: "invalid credentials"});
    }//end if
  })
  .catch(error => {
    console.log('error:', error)
    res.status(500).json({error: "Could not process your request"})
  })

})//end login

function generateToken(user){
  const payload= {
    subject: user.id,
    username: user.username
  };
  const options= {
    expiresIn: '1h'
  };

  return jwt.sign(payload, jwtSec, options);
}//end generateToken


module.exports= router;