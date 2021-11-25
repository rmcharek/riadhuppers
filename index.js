const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const expressJwt = require('express-jwt');
const loginRouter = require('./auth');


const productRouter = require('./product')

const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS,HEAD');
  next();
});


app.use(bodyParser.json());

//app.get('/', (request, response) => response.redirect('/movie'));

app.use(morgan('common', { immediate: true }));

app.use('/login', loginRouter);
app.use('/product', expressJwt({ secret: 'secret' , algorithms: ['RS256'] }), productRouter);


app.use(function(err, request, response, next) {
  if (err.name === 'UnauthorizedError') {
    response.status(401).json('unauthorized');
  } else {
    next();
  }
});

app.listen(5000, () => {
  console.log('Server is listening to http://localhost:5000');
});
