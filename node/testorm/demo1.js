const Sequelize = require('sequelize');

    // host  : '47.75.84.250',
    // user     : 'root',
    // password : '158269',
    // database : 'blog'

//方法1:单独传递参数
const sequelize = new Sequelize('lty', 'root', '158269', {
    host: '47.75.84.250',
    dialect:  'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});
// console.log(sequelize);
// sequelize
//     .authenticate()
//     .then(() => {
//         console.log('Connection has been established successfully.');
//     })
//     .catch(err => {
//         console.error('Unable to connect to the database:', err);
//     });
// sequelize.close();


// 方法2: 传递连接 URI
// const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname');

// const Model = Sequelize.Model;
// class User extends Model {}
// User.init({
//     // 属性
//     firstName: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     lastName: {
//         type: Sequelize.STRING
//         // allowNull 默认为 true
//     }
// }, {
//     sequelize,
//     modelName: 'user'
//     // 参数
// });

const User = sequelize.define('user2', {
    // 属性
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING
        // allowNull 默认为 true
    }
}, {
    // 参数
    timestamps: false
});
// User.sync({ force: true })
// 查找所有用户
User.findAll().then(users => {
    console.log(users);
    console.log("All users:", JSON.stringify(users, null, 4));
});
//
// // 创建新用户
// User.create({ firstName: "Jane", lastName: "Doe" }).then(jane => {
//     console.log("Jane's auto-generated ID:", jane.id);
// });
//
// // 删除所有名为“Jane”的人
// User.destroy({
//     where: {
//         firstName: "Jane"
//     }
// }).then(() => {
//     console.log("Done");
// });
//
// // 将所有没有姓氏的人改为“Doe”
// User.update({ lastName: "Doe" }, {
//     where: {
//         lastName: null
//     }
// }).then(() => {
//     console.log("Done");
// });
// 注意:如果表已经存在,使用`force:true`将删除该表
// User.sync({ force: true }).then(() => {
//     // 现在数据库中的 `users` 表对应于模型定义
//     return User.create({
//         firstName: 'John',
//         lastName: 'Hancock'
//     });
// });


//这个有点顶，强势
//
