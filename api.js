var express = require('express');
var api = express();

api.all('/api/auth', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

api.get('/', function (req, res) {
  res.send('Helllo World!');
});

api.post('/api/auth', function (req, res) {
  res.json({
    usuario: {
      nome: 'Administrador'
    },
    token: 'xsxsxsxss'
  });
});

api.listen(3000, function () {
  console.log('Example api listening on port 3000!');
});
