var express = require('express');
var app = express();
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

app.listen(3000, function(){
  console.log('Server  started!');
});

app.get('/', function(req, res){
  res.redirect('/0');
});

app.get('/:id', function(req, res){
  console.log(req.params.id);
  res.render('home');
});
