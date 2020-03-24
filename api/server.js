const express= require('express');
const server= express();
const cors= require('cors');
const helmet= require('helmet');

//middleware
server.use(cors());
server.use(helmet());
server.use(express.json());

//define routers
const usersRouter= require('../users/usersRouter');
const authRouter= require('../auth/authRouter');

//assign routers
server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);


//root route
server.get('/', (req, res) => {
  res.send('<h1>Welcome to my humble server</h1>');
});

//fallbackcase
server.use(function notFound(req, res){
  res.status(500).json({message: "Could not find what you are looking for"});
});


module.exports= server;