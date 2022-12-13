// 1.导入Sequelize
const Sequelize = require('sequelize');
const {MYSQL_CONFIG} = require('../config/db');

// 2.配置连接信息
/*
第一个参数: 要操作的数据库名称
第二个参数: 数据库用户名
第三个参数: 数据库密码
第四个参数: 其它的配置信息
* */
const seq = new Sequelize(
    MYSQL_CONFIG.databaseName,
    MYSQL_CONFIG.databaseUserName,
    MYSQL_CONFIG.databasePassword,
    MYSQL_CONFIG.conf);

module.exports = seq;