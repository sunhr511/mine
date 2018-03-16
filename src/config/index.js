// 开发环境为true，生产环境为false
let ISDEV = true
// let ISDEV = false
let host = 'http://www.udao56.com/thinkphp5/index.php/tms'
// let host = 'http://120.27.18.62/thinkphp5/index.php/tms'
// let host = 'http://47.92.132.179/thinkphp5/index.php/tms'
// let host = 'http://219.148.37.219/thinkphp5/index.php/tms'
let devUrl = host
if (ISDEV) { devUrl = '/api' }
module.exports = {
  host,
  devUrl
}
