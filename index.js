var express = require('express');
var app = express();

var getHotgirlInfo = require('./db.js').getHotgirlInfo;
var hitLike = require('./db.js').hitLike;
var hitDislike = require('./db.js').hitDislike;

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

app.listen(3000, function(){
  console.log('Server  started!');
});

app.get('/', function(req, res){
  res.redirect('/1');
});

app.get('/list/:id', function(req, res){
  getHotgirlInfo(req.params.id, function(girl){
    if(girl == undefined){
      res.redirect('/1');
    }else{
      res.render('home', {girl: girl});
    }
  });
});

app.get('/like/:id', function(req, res){
  hitLike(req.params.id, function(resultCode){
    if(resultCode == 1){
      res.send('Thanh cong');
    }else{
      res.send('That bai');
    }
  })
});

app.get('/dislike/:id', function(req, res){
  hitDislike(req.params.id, function(resultCode){
    if(resultCode == 1){
      res.send('Thanh cong');
    }else{
      res.send('That bai');
    }
  })
});
