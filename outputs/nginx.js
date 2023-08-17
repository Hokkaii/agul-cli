const fs = require('fs')
const ejs = require('ejs')
const path = require('path')
const { nginxFormat } = require('nginx-format')

const nginxcTemplate = require('../templates/nginx')
const { getMain, getChild, getDefault } = require("../fragments/nginx")
module.exports = async function (type, name, mkdtemp) {
    // 复制模板项目到临时目录
    let umircRes = ejs.render(nginxcTemplate, {
        data: type === '普通项目' ? getDefault() : type === '微前端主项目' ? getMain(name) : getChild(name)
    }, { rmWhitespace: true });
    umircRes = nginxFormat(umircRes, { encoding: 'utf8' })
    // 写入文件
    fs.writeFileSync(path.resolve(__dirname, `../${mkdtemp}`, "nginx", 'conf.d', 'soa.conf'), umircRes)
}
