const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const routes = express.Router()
const PORT = 5050;
const bodyParser = require('body-parser')

app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, './App/App.html'));
});

app.get('/script.js', function (req, res) {
    res.sendFile(path.join(__dirname, './App/script.js'));
});

routes.route('/todo').get(function (req, res, next) {
    fs.readFile('./Database/Todo.json', 'utf8', function(err, data) {
        res.send(data);
    });
});

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16); 
    });
}
  
routes.route('/todo/delete').delete(function (req, res, next) {
});

routes.route('/todo/add').post(function (req, res, next) {
});

app.use('/api', routes);

var server = app.listen(PORT, () => console.log(`Connected to Port:${PORT}`))
module.exports = server
