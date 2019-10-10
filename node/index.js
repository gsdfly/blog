const express = require('express');
const bodyParser     =         require("body-parser");
const connection = require('./database')
const app = express()

// app.use()
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/api/login', (req, res) => {
    res.send('Hello World!')
});
app.post('/api/register', (req, res) => {
    console.log(req.body);
    let name=req.body.name;
    let nickname = req.body.nickname;
    let phone = req.body.phone;
    let pwd=req.body.pwd;
    console.log(req.body);
    connection.connect();
    let sql = "Insert into user (name,nickname,phone,pwd) values (?,?,?,?)";
    connection.query(sql,[name,nickname,phone,pwd],function (err, result) {
        if(err){
        console.log('[SELECT ERROR] - ',err.message);
        return;
    }

    console.log('--------------------------SELECT----------------------------');
    console.log(result);
    console.log('------------------------------------------------------------\n\n');
        res.end("yes");
    })
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))
