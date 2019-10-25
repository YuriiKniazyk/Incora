const express = require('express');
const app = express();
const cors = require('cors');
const dataBase = require('./db/index').getInstance();
dataBase.setModels();
const config = require('./constant/config');
const error404 = require('./controllers/error404');
const feedRouter = require('./routes/feedRouter');
const swaggerUi = require('swagger-ui-express'),
  swaggerDocument = require('./swagger.json');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let whitelist = ['http://localhost:3000', 'http://localhost:3300'];
let corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE,PATCH");
  res.header("Access-Control-Allow-Headers", '*');
  next();
});

app.get('/', (req, res, next) =>  res.json('HI From RSS Parser API'));
app.use('/feed', cors(corsOptions), feedRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, { explorer: true }));
app.use('*', cors(corsOptions), error404);

app.listen(config.port, err => {
  console.log('Server listen on port ' + config.port + '...');

});
