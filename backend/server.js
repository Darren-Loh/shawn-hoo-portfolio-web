const express = require('express');
const cors = require('cors');
const { expressjwt: jwt } = require('express-jwt');
const jwks = require('jwks-rsa');
const axios = require('axios');

const port = 4000;

const verfiyJwt = jwt({
  secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: 'https://dev-k7qyz1loh8gg2vdj.eu.auth0.com/.well-known/jwks.json'
  }),
  audience: 'shawnHooExpressBackend',
  issuer: 'https://dev-k7qyz1loh8gg2vdj.eu.auth0.com/',
  algorithms: ['RS256']
});

const app = express();
app.use(cors());
app.use(verfiyJwt);

app.get('/protected', (req, res) => {
  res.send("hello from protected route");
})

app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
})

app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || 'Internal Server Error';
  res.status(status).send(message);
})

app.listen(port, () => console.log('server on port 4000'));