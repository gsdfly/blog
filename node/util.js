const qiniu = require('qiniu')

let isMobile = function (str_data) {
    str_data = str_data || String(this);
    var length = str_data.length;
    return length == 11 && /^1\d{10}$/.test(str_data);
}
exports.isMobile = isMobile;

let getQnToken = function f() {
    var accessKey = '7PNzMjYTxqp2TrSZ1FBx7GMT8C9lm55iPAF1ua9S';
    var secretKey = 'KWSQuimbBYZmSmhvp-RlXheXZcZuiXqqxv5FAKoB';
    var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    var options = {
        scope: 'ly-dev',
    };
    var putPolicy = new qiniu.rs.PutPolicy(options);
    var uploadToken=putPolicy.uploadToken(mac);
    return uploadToken
}
exports.getQnToken = getQnToken;

let timestampToTime=function(timestamp) {
    const date = new Date(timestamp);
    const Y = date.getFullYear() + '-';
    const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    const D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
    const h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
    const m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
    const s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    return Y + M + D + h + m + s;
};
exports.timestampToTime=timestampToTime;



