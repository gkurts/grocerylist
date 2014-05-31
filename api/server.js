var express = require('express');
var app = express();
var bodyParser = require('body-parser'); //bodyparser + json + urlencoder
var morgan  = require('morgan'); // logger

app.listen(3001);
app.use(bodyParser());
app.use(morgan());

//Routes
var routes = {};
routes.lists = require('./route/lists.js');


app.all('*', function(req, res, next) {
  res.set('Access-Control-Allow-Origin', 'http://localhost');
  res.set('Access-Control-Allow-Credentials', true);
  res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
  res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
  if ('OPTIONS' == req.method) return res.send(200);
  next();
});

app.use('/', express.static('../app'))

app.get('/lists', routes.lists.getLists);
app.get('/lists/:id', routes.lists.getList);
app.post('/lists', routes.lists.create);
app.post('/lists/:id', routes.lists.update);
app.post('/lists/:id/delete', routes.lists.delete);

app.post('/lists/:id/items', routes.lists.addItem);
app.post('/lists/:id/items/:itemId/update', routes.lists.updateItem);
app.post('/lists/:id/items/:itemId/updateqty', routes.lists.changeQty);
app.post('/lists/:id/items/:itemId/delete', routes.lists.deleteItem);
app.post('/lists/:id/items/:itemId/got', routes.lists.gotItem);



console.log('The magic happens at http://localhost:3001/');