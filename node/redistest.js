var redis = require('redis');
var client = redis.createClient(6379, '127.0.0.1');
client.on('connect', function () {
    // set 语法
    client.set('name', 'long', function (err, data) {
        console.log(data)
    })
    // get 语法
    client.get('name', function (err, data) {
        console.log(data)
    })

    client.lpush('class',1,function (err,data) {
        console.log(data)
    })

    client.lrange('class',0,-1,function (err,data) {
        console.log(data)
    })
})
//创建redis连接服务对象
var redis = require('redis');

var redisServerIP = '127.0.0.1';
var redisServerPort= '6379';

function setup_redis() {
    var client = redis.createClient(redisServerPort, redisServerIP);
    client.on('error', function(error) {
        console.log("RedisServer is error!\n" + error);
    });
    client.on("connect", function() {
        console.log("RedisServer is connected!");
    });
    client.on("end", function() {
        console.log("RedisServer is end!");
    });
    return client;
}

module.exports.setup_redis = setup_redis;
