var express = require('express');
var app = express();
var getHotgirlInfo = require('./db.js');
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

app.listen(3000, function(){
  console.log('Server  started!');
});

app.get('/', function(req, res){
  res.redirect('/1');
});

app.get('/:id', function(req, res){
  getHotgirlInfo(req.params.id, function(girl){
    if(girl == undefined){
      res.redirect('/1');
    }else{
      res.render('home', {girl: girl});
    }
  });
});

app.get('/like/:id', function(req, res){

});
