const User = require('../db/model/user');

/**
 * 根据用户名获取用户信息你
 * @param username 被获取的用户名
 * @returns {Promise<*>}
 */
async function getUser(username, password) {
    if(password){
        let results = await User.findAll({
            where:{
                username:username,
                password:password
            }
        });
        return results;
    }else{
        let results = await User.findAll({
            where:{
                username:username
            }
        });
        return results;
    }
}
async function createUser({username, password, gender}){
    let results = await User.create({
        username:username,
        password:password,
        gender:gender
    });
    return results['dataValues'];
}
module.exports = {
    getUser,
    createUser
}