const express = require('express');
const bodyParser = require("body-parser");
const config = require('./config');
const util = require('./util')
// const connection = require('./database')
const jwt = require('jsonwebtoken');
const redis = require('redis');
const logger = require('morgan');
const fs = require('fs');
const FileStreamRotator = require('file-stream-rotator');
// const path = require('path');

let mysql = require('mysql');

const crypto = require('crypto');
const app = express();
const client = redis.createClient(6379, '127.0.0.1');

var logDirectory = __dirname + '/log';

// 确保日志目录存在
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true}));
//添加日志模块
let accessLogStream = FileStreamRotator.getStream({
    date_format: 'YYYY-MM-DD',
    filename: logDirectory + '/%DATE%.log',
    frequency: 'daily',
    file_options :{
        encoding:'utf-8'
    } ,
    verbose: false
});

app.use(logger('dev',{stream: accessLogStream}
// {
//     stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
// }
));

// app.all("*",function (req,res,next) {
//     logger()
//     console.log(req);
//     console.log(res);
//     next()
// });

let handleToken = function (req, res, next) {
    let reqPath = req.baseUrl;
    if (!(reqPath.indexOf('login') != -1 || reqPath.indexOf('register') != -1)) {
        let token = req.headers.token || req.headers.authorization.split(' ')[1];
        client.sadd('token',token,function (err,value) {
            if(value == 1){
                res.status(401).send({status_code: 401, message: '请先登录'});
                return;
            }
            if (!token) {
                res.status(401).send({status_code: 401, message: '请先登录'});
                return;
            } else {
                let obj = jwt.verify(token, 'secret');
                if (new Date().getTime() > obj.exp * 1000) {
                    res.status(401).send({status_code: 401, message: 'token已过期，请重新登录'});
                    return;
                }
            }
            next();
        });
    }else {
        next();
    }
};
app.use('/admin/*',handleToken);

app.get('/admin/publicToken',(req,res)=>{
    res.status(200).send({status_code:200,data:{token:util.getQnToken()}})
});
//admin
app.post('/admin/login', (req, res) => {
    let nickname = req.body.nickname;
    let pwd = req.body.pwd;
    if (!nickname) {
        res.status(400).send({status_code: 400, message: '用户名不能为空'});
        return;
    }
    if (!pwd) {
        res.status(400).send({status_code: 400, message: '密码不能为空'});
        return;
    } else if (pwd.length < 6) {
        res.status(400).send({status_code: 400, message: '密码不正确1'});
        return;
    } else {
        let hash = crypto.createHash('md5');
        pwd = hash.update(pwd).digest('hex');
        let sql = 'select id,nickname from admin where nickname=? and pwd = ?';
        let connection = mysql.createConnection(config.database);
        connection.connect();
        connection.query(sql, [nickname, pwd], function (err, result) {
            console.log(result);
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                res.status(500).send({status_code: 500, message: err.message});
                return;
            }
            if (result[0]) {
                // 根据用户id、用户名、定义好的秘钥、过期时间 生成 token
                let token = jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 6),
                    id: result[0].id,
                    nickname: result[0].nickname,
                }, 'secret');
                client.sadd('token',token,function (err,value) {
                    if(!err){
                        console.log('添加token成功');
                    }
                });
                //生成token返回
                res.status(200).send({status_code: 200, message: '登录成功', data: {token: token}});
            } else {
                res.status(400).send({status_code: 400, message: '密码不正确'});
            }
        })
    }
});

app.get('/admin/logout',(req,res)=>{
    let token = req.headers.token || req.headers.authorization.split(' ')[1];
    //退出登录删除redis中的token
    client.srem('token',token,function(err,value){
        res.status(200).send({status_code: 200, message: '退出成功'});
    });
});

app.get('/admin/articleType',(req,res)=>{
    let sql = 'select id,type from article_type';
    let connection = mysql.createConnection(config.database);
    connection.connect();
    connection.query(sql,  function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.status(500).send({status_code: 500, message: err.message});
            return;
        }
        res.status(200).send({status_code:200,data:{type:result}})
    })
});

app.post('/admin/addArticle',(req,res)=>{
    let {title,summary,img,content,article_type_id} = req.body;
    let arr = [['title','标题'],['summary','简介'],['img','封面'],['content','内容'],['article_type_id','分类']];
    for(let i=0;i<arr.length;i++){
        if(!req.body[arr[i][0]]){
            res.status(400).send({status_code: 400, message: arr[i][1]+'不能为空'});
            return;
        }
    }
    let create_time = util.timestampToTime(new Date().getTime());
    console.log();
    let connection = mysql.createConnection(config.database);
    connection.connect();
    let sql = 'INSERT INTO article (title,summary,img,content,acticle_type_id,create_time) VALUES (?,?,?,?,?,?)';
    connection.query(sql,[title,summary,img,content,Number(article_type_id),create_time],function (err,result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.status(500).send({status_code: 500, message: err.message});
            return;
        }
        res.status(200).send({status_code:200,message:'发布成功'})
    });
});

app.get('/admin/articles',(req,res)=>{
    let {type,pageNo=1,pageSize=10} = req.query;
    let sql = type?  'select * from article where acticle_type_id = ? limit ?,?' :'select * from article limit ?,?';
    let sql2 =  type?'select count(*) from article where acticle_type_id = ? ':'select count(*) from article';
    let params = type?[type,(pageNo-1)*pageSize,pageSize]:[(pageNo-1)*pageSize,pageSize];
    let connection = mysql.createConnection(config.database);
    connection.connect();
    connection.query(sql,params,function (err,result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.status(500).send({status_code: 500, message: err.message});
            connection.end()
            return;
        }
        connection.query(sql2,[type],function (err2,result2) {
            if (err2) {
                console.log('[SELECT ERROR] - ', err.message);
                res.status(500).send({status_code: 500, message: err.message});
                connection.end();
                return;
            }
            connection.end();
            res.status(200).send({status_code:200,data:{articles:result,current_page:Number(pageNo),total:result2[0]['count(*)'],last_page:Math.ceil(result2[0]['count(*)']/pageSize),per_page:pageSize}})
        })
    })
});

app.get('/admin/article',(req,res)=>{
    let {id} = req.query;
    let sql = 'select * from article where id = ?';
    let connection = mysql.createConnection(config.database);
    connection.connect();
    connection.query(sql,[id],function (err,result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.status(500).send({status_code: 500, message: err.message});
            connection.end();
            return;
        }
        res.status(200).send({status_code:200,data:result[0]})
    })
});

app.post('/admin/update/article',(req,res)=>{
    let {id,title,summary,img,content,article_type_id} = req.body;
    let sql = 'update article set title=?,summary=?,img=?,content=?,acticle_type_id=? where id = ?';
    let connection = mysql.createConnection(config.database);
    connection.connect();
    connection.query(sql,[title,summary,img,content,article_type_id,id],function (err,result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.status(500).send({status_code: 500, message: err.message});
            connection.end();
            return;
        }
        res.status(200).send({status_code:200,data:{message:'更新成功'}});
    })
});

app.get('/admin/user',(req,res)=>{
    let {pageNo=1,pageSize=10} = req.query;
    let sql = 'select id,nickname,create_time from admin limit ?,?';
    let sql2 = 'select count(*) from admin';
    let connection = mysql.createConnection(config.database);
    connection.connect();
    connection.query(sql,[(pageNo-1)*pageSize,pageSize],function (err,result) {
        if(err){
            console.log('[SELECT ERROR] - ', err.message);
            res.status(500).send({status_code: 500, message: err.message});
            connection.end()
            return;
        }
        connection.query(sql2,function (err2,result2) {
            res.status(200).send({status_code:200,data:{data:result,current_page:Number(pageNo),total:result2[0]['count(*)'],last_page:Math.ceil(result2[0]['count(*)']/pageSize),per_page:pageSize}})
})
})
});


app.get('/api/articles', (req, res) => {
    let query = req.query;
    let connection = mysql.createConnection(config.database);
    connection.connect();
    let sql = 'select * from article';
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.status(500).send({status_code: 500, message: err.message});
            return;
        }
        console.log(result);
        res.status(200).send({status_code: 200, data: {articles: result}})
    });
});

app.post('/api/login', (req, res) => {
    //登录有2种方式用户名和密码，手机号和验证码，手机号先不做
    let nickname = req.body.nickname;
    let pwd = req.body.pwd;
    if (!nickname) {
        res.status(400).send({status_code: 400, message: '用户名不能为空'});
        return;
    }
    if (!pwd) {
        res.status(400).send({status_code: 400, message: '密码不能为空'});
        return;
    } else if (pwd.length < 6) {
        res.status(400).send({status_code: 400, message: '密码不正确1'});
        return;
    } else {
        let hash = crypto.createHash('md5');
        pwd = hash.update(pwd).digest('hex');
        let sql = 'select id,nickname from user where nickname=? and pwd = ?';
        let connection = mysql.createConnection(config.database);
        connection.connect();
        connection.query(sql, [nickname, pwd], function (err, result) {
            console.log(result);
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                res.status(500).send({status_code: 500, message: err.message});
                return;
            }
            if (result[0]) {
                // 根据用户id、用户名、定义好的秘钥、过期时间 生成 token
                let token = jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 6),
                    id: result[0].id,
                    nickname: result[0].nickname,
                }, 'secret');
                //生成token返回
                res.status(200).send({status_code: 200, message: '登录成功', data: {token: token}});
            } else {
                res.status(400).send({status_code: 400, message: '密码不正确'});
            }
        })
    }
});
app.post('/api/register', (req, res) => {
    const hash = crypto.createHash('md5');
    let name = req.body.name;
    let nickname = req.body.nickname;
    let phone = req.body.phone;
    let pwd = req.body.pwd;
    if (!name) {
        res.status(400).send({status_code: 400, message: '真实姓名不能为空'});
        return;
    }
    if (!nickname) {
        res.status(400).send({status_code: 400, message: '用户名不能为空'});
        return;
    }
    if (!phone) {
        res.status(400).send({status_code: 400, message: '手机号不能为空'});
        return;
    } else if (!util.isMobile(phone)) {
        res.status(400).send({status_code: 400, message: '手机号格式不正确'});
        return;
    }
    if (!pwd) {
        res.status(400).send({status_code: 400, message: '密码不能为空'});
        return;
    } else if (pwd.length < 6) {
        res.status(400).send({status_code: 400, message: '密码长度不小于6位数'});
        return;
    }
    let connection = mysql.createConnection(config.database);
    //验证用户名和手机号是否已经存在
    let userSql = "select * from user where nickname=?";
    let phoneSql = "select * from user where phone=?";
    connection.connect();
    connection.query(userSql, [nickname], function (err, result) {
        if (result[0]) {
            res.status(400).send({status_code: 400, message: '用户名已经存在'});
            connection.end();
            return;
        } else {
            connection.query(phoneSql, [phone], function (err2, result2) {
                if (result2[0]) {
                    res.status(400).send({status_code: 400, message: '手机号已经存在'});
                    connection.end();
                    return;
                } else {
                    console.log('ddd');
                    pwd = hash.update(pwd).digest('hex');
                    let sql = "Insert into user (name,nickname,phone,pwd) values (?,?,?,?)";
                    connection.query(sql, [name, nickname, phone, pwd], function (err3, result3) {
                        if (err3) {
                            console.log('[SELECT ERROR] - ', err3.message);
                            res.status(500).send({status_code: 500, message: err3.message});
                            return;
                        }
                        console.log('--------------------------SELECT----------------------------');
                        console.log(result3);
                        console.log('------------------------------------------------------------\n\n');
                        res.status(200).send({status_code: 200, message: '注册成功'});
                        connection.end();
                    });
                }
            })
        }
    });
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))
