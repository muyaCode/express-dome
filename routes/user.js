const express = require('express');
const router = express.Router();
const {registerUser, loginCheck} = require('../controller/userController');

router.post('/login',async (req, res, next)=>{
    // 处理登录
    let result = await loginCheck(req.body);
    // 存储登录状态
    if(result.code === 200){
        req.session.username = result.data.username;
        req.session.password = result.data.password;
        req.session.gender = result.data.gender;
    }
    return res.json(result);
});
router.post('/register',async (req, res, next)=>{
    // 注册用户
    let result = await registerUser(req.body);
    // 返回注册结果
    return res.json(result);
});
router.get('/test', (req, res, next)=>{
    console.log(req.session);
    if(req.session.username){
        res.end('login ok');
    }else{
        res.end('login error');
    }
});

module.exports = router;