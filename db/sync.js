const seq = require('./seq');

// 0.导入模型
require('./model/user');

// 1.测试配置是否正确
seq.authenticate()
    .then(()=>{
        console.log('ok');
    })
    .catch((err)=>{
        console.log(err);
    });

// 2.执行同步方法, 创建表
seq.sync().then(()=>{
    console.log('sync ok');
});