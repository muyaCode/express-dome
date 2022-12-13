const Ajv = require('ajv');
const ajv = new Ajv();
const userSchema = require('../validator/userValidator');
const {getUser, createUser} = require('../service/userService');
const {SuccessModel, ErrorModel} = require('../model/resultModel');
const {userDataFail, userExistsFail, userRegisterFail, userLoginFail} = require('../config/errorConst');
const generatePwd = require('../utils/crypto');

/**
 * 校验用户数据是否正确
 * @param data 被校验的数据
 * @returns {boolean | PromiseLike<any>}
 */
function userValidate(data) {
    return ajv.validate(userSchema, data);
}

/**
 * 检查用户是否存在
 * @param username 被检查的用户名称
 * @returns {Promise<boolean>}
 */
async function userExists(username){
    let users = await getUser(username);
    return users.length !== 0;
}

/**
 * 用户注册
 * @param data 用户数据
 * @returns {Promise<ErrorModel|*>}
 */
async function registerUser({username, password, gender}){
// 1.校验数据是否正确
    let valid = userValidate({username, password, gender});
    if(!valid){
        return new ErrorModel(userDataFail);
    }
    // 2.判断当前注册的用户是否存储
    let isExists = await userExists(username);
    // 3.判断是否可以注册
    if(valid && !isExists){
        try {
            // 密码加密之后再存储
            await createUser({username, password: generatePwd(password), gender});
            return new SuccessModel({msg:'注册成功'});
        }catch (e) {
            return new ErrorModel(userRegisterFail);
        }
    }else{
        return new ErrorModel(userExistsFail);
    }
}

/**
 * 登录
 * @param username  用户名
 * @param password  密码
 * @returns {Promise<ErrorModel|*|SuccessModel|*>}
 */
async function loginCheck({username, password}){
    // 由于存储的密码是加密的, 所以登录时也要用加密的密码去登录
    let users = await getUser(username, generatePwd(password));
    if(users.length !== 0){
        return new SuccessModel({msg: '登录成功', data: users[0]});
    }else{
        return new ErrorModel(userLoginFail);
    }
}

module.exports = {
    registerUser,
    loginCheck
}