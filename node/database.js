
var mysql  = require('mysql');
var pool  = mysql.createPool({
    connectionLimit : 10,
    host     : '47.75.84.250',
    user     : 'root',
    password : '158269',
    database : 'blog'
});
// var connection = mysql.createConnection({
//     host     : '47.75.84.250',
//     user     : 'root',
//     password : '158269',
//     database : 'blog'
// });
// connection.connect();
//

var sql = "select * from article";
pool.query(sql,function (err,result,fields) {
   console.log(result);
});
// // var sqlParams = [4,'lisi',23];
//
// connection.query(sql,function (err, result) {
//     if(err){
//         console.log('[SELECT ERROR] - ',err.message);
//         return;
//     }
//
//     console.log('--------------------------SELECT----------------------------');
//     console.log(result);
//     console.log('------------------------------------------------------------\n\n');
// });
//
// connection.end();

// module.exports = connection
