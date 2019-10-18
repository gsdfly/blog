var path = require('path');
var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var app = express();

// 使用 cookieParser 中间件;
app.use(cookieParser());
app.use(session({
    name: 'isFirst', // 这里是cookie的name，默认是connect.sid
    secret: 'my_session_secret', // 建议使用 128 个字符的随机字符串
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 1000, httpOnly: true }
}));

// var se = session(options);
// 如果请求中的 cookie 存在 isFirst
// 否则，设置 cookie 字段 isFirst, 并设置过期时间为10秒
// app.get('/', function(req, res) {
//     if (req.signedCookies.isFirst) {
//         res.send("欢迎再一次访问");
//         console.log(req.signedCookies)
//     } else {
//         res.cookie('isFirst', 1, { maxAge: 60 * 1000, signed: true});
//         res.send("欢迎第一次访问");
//     }
//
//     // if (req.cookies.isFirst) {
//     //     res.send("再次欢迎访问");
//     //     console.log(req.cookies)
//     // } else {
//     //     res.cookie('isFirst', 1, { maxAge: 60 * 1000});
//     //     res.send("欢迎第一次访问");
//     // }
// });
app.get('/', function(req, res, next) {
    console.log(req.session);
    console.log(req.cookies);
    if(req.session.isFirst || req.cookies.isFirst) {
        res.send("欢迎再一次访问");
    } else {
        req.session.isFirst = 1;
        res.cookie('isFirst', 1, { maxAge: 60 * 1000, singed: true});
        res.send("欢迎第一次访问。");
    }
});
app.listen(3034, function() {
    console.log('express start on: ' + 3030)
});



