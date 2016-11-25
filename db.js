var pg = require('pg');
var config = {
  user: 'postgres',
  password: 'khoapham',
  database: 'USER',
  host: 'localhost',
  port: 5432,
  max: 10,
  idleTimeoutMillies: 1000
}

var pool = new pg.Pool(config);

function queryDB(sql, cb){
  pool.connect(function(err, client, done){
    if(err){
      console.log('LOI KET NOI ' + err);
    }else{
      done();
      client.query(sql, cb);
    }
  });
}
//SELECT * FROM "User" WHERE username = 'xyz' AND password = 'abc'
pool.on('error', function(err, client){
  console.log('LOI:: ' + err);
});

function getHotgirlInfo(id, cb){
  sql = `SELECT * FROM "Hotgirl" WHERE id = ${id}`;
  console.log(sql);
  queryDB(sql, function(err, result){
    if(err){
      console.log(err);
    }else{
      cb(result.rows[0]);
    }
  });
}

function hitLike(id, cb){
  sql = `UPDATE "Hotgirl" SET "like" = "like" + 1 WHERE id = ${id}`;
  queryDB(sql, function(err, result){
    if(result.rowCount == 1){
      cb(1);
    }else{
      cb(2);
    }
  })
}

function hitDislike(id, cb){
  sql = `UPDATE "Hotgirl" SET "dislike" = "dislike" + 1 WHERE id = ${id}`;
  queryDB(sql, function(err, result){
    if(result.rowCount == 1){
      cb(1);
    }else{
      cb(2);
    }
  })
}

module.exports.getHotgirlInfo = getHotgirlInfo;
module.exports.hitLike = hitLike;
module.exports.hitDislike = hitDislike;
// getHotgirlInfo(2, function(girl){
//   console.log(girl);
// })

// queryDB('SELECT * FROM "Hotgirl"', function(err, result){
//   console.log(result.rows);
// })
