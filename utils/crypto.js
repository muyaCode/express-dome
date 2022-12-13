// 1.导入加密模块
const crypto = require('crypto');
const secret = 'com.it666';
// 2.创建加密方法
function _md5(password) {
    /*
    MD5加密（加密不可逆）
    MD5的全称是Message-Digest Algorithm 5（信息-摘要算法）。 128位长度。
    目前MD5是一种不可逆算法。具有很高的安全性
    什么叫做不可逆?
    不可以通过加密之后的内容还原加密之前的内容, 我们就称之为不可逆
    * */
    // 1.指定加密方式
    const md5 = crypto.createHash('md5')
    // 2.指定需要加密的内容和加密之后输出的格式
    const hash = md5.update(password) // 指定需要加密的内容
                    .digest('hex'); // 指定加密之后输出的格式
    /*
    注意点:
    MD5加密, 只要加密的内容没有发生变化, 那么加密之后的内容就不会发生变化
    所以正式因为如此, 虽然MD5是不可逆的, 但是可以暴力破解
    正式因为如此, 所以仅仅通过MD5加密也不安全
    所以我们在加密之前应该对原始数据进行加盐操作
    什么叫做加盐?
    给原始数据混入一些其它数据
    * */
    // console.log(hash); // e80b5017098950fc58aad83c8c14978e
                       // e80b5017098950fc58aad83c8c14978e
    return hash;
}
function generatePwd(password){
    password = password + secret;
    let hash = _md5(password);
    // console.log(hash); // 4167228cfbe1daa78e88c41bf357618e --> abcdefcom.it666
    return hash;
}
module.exports = generatePwd;
// _md5('abcdef');
// generatePwd('abcdef');
/*
数据库:
source(原始值)   target(加密之后值)
abcdef           e80b5017098950fc58aad83c8c14978e
* */
