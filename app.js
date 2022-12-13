// 导入了一些第三方的模块
const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const path = require('path');
const fs = require('fs');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const redisClient = require('./db/redis');

require('./db/sync'); // 初始化数据库表
// 导入了处理路由的模块
const usersRouter = require('./routes/user');

// 创建了服务端实例对象
const app = express();

// 处理动态网页
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
/*
在express中我们可以通过morgan来记录日志
我们只需要安装morgan, 导入morgan, 注册morgan的中间件即可
在注册morgan中间件的时候需要指定日志的模式, 不同的模式记录的内容也不同
默认情况下morgan会将日志输出到控制台中, 当然我们也可以通过配置让它把日志写入到文件中
* */
// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log/access.log'), { flags: 'a' });
app.use(logger('combined', {
  stream: accessLogStream
}));
// 处理post请求参数
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// 解析cookie
app.use(cookieParser());
// 保存登录状态
app.use(session({
  name: 'userId',
  secret: 'COM.it6666.*?', // 用于生成无关紧要的userId的密钥
  cookie: { path:'/', httpOnly: true, maxAge: 24 * 60 * 60 * 1000 },
  store: new RedisStore({ client: redisClient })
}));

// 处理静态网页
app.use(express.static(path.join(__dirname, 'public')));

// 注册处理路由模块
app.use('/api/user', usersRouter);

// 处理错误
app.use(function(req, res, next) {
  next(createError(404));
});
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
