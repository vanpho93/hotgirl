var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var parser = bodyparser.urlencoded({extended: false});
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
  res.redirect('/list/1');
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

app.get('/ajax', function(req, res){
  res.send('I am ajax');
});

app.get('/like/:id', function(req, res){
  hitLike(req.params.id, function(resultCode){
    if(resultCode == 1){
      getHotgirlInfo(req.params.id, function(girl){
        res.send(girl.like+'')
      });
    }else{
      res.send('That bai');
    }
  })
});

app.post('/xuly', parser, function(req, res) {
  var msg = `Chao ${req.body.name}, nam nay ${req.body.tuoi} tuoi`
  res.send(msg);
});

app.get('/info/:id', function(req, res){
  getHotgirlInfo(req.params.id, function(girl){
    res.send(girl);
  });
});

app.get('/dislike/:id', function(req, res){
  hitDislike(req.params.id, function(resultCode){
    if(resultCode == 1){

      getHotgirlInfo(req.params.id, function(girl){
        res.send(girl.dislike+'')
      });

    }else{
      res.send('That bai');
    }
  })
});
