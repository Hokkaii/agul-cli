const fs = require('fs')
const ejs = require('ejs')
const path = require('path')
const format = require('prettier-format')
const umircTemplate = require('../templates/.umirc.ts')
const { getMain, getChild, getDefault } = require("../fragments/.umirc.ts")
module.exports = async function (type, name, mkdtemp) {
    // 复制模板项目到临时目录
    let umircRes = ejs.render(umircTemplate, {
        data: type === '普通项目' ? getDefault() : type === '微前端主项目' ? getMain(name) : getChild(name)
    }, { rmWhitespace: true });
    // 写入文件
    umircRes = await format(umircRes)
    fs.writeFileSync(path.resolve(__dirname, `../${mkdtemp}`, '.umirc.ts'), umircRes)
}
