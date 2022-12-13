// 1.导入Redis模块
const redis = require("redis");
const {REDIS_CONFIG} = require('../config/db');

// 2.建立Redis连接
const client = redis.createClient(REDIS_CONFIG.port, REDIS_CONFIG.host);
client.on("error", function(error) {
    console.error(error);
});

module.exports = client;
