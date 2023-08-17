#!/usr/bin/env node

// 交互式命令行
const inquirer = require('inquirer')
const fs = require('fs')
const path = require('path')
// loading
const ora = require('ora');
// 修改控制台字符串的样式
const chalk = require('chalk')
// const shell = require('shelljs');
const outPutUmirc = require('../outputs/.umirc.ts')
const outPutNginx = require('../outputs/nginx')
const { deleteFolderRecursive } = require('../untils/fileUtil')
// 自定义交互式命令行的问题及简单的校验
let question = [
    {
        name: "type",
        type: 'list',
        message: "请选择项目类型",
        choices: ["普通项目", "微前端主项目", "微前端子项目"],
    },
    {
        name: "name",
        type: 'input',
        default: "demo",
        message: "请输入项目名称",
        validate(val) {
            if (val === '') return '请输入项目名称'
            return true
        }
    }
]

inquirer
    .prompt(question).then(async answers => {
        // answers 就是用户输入的内容，是个对象
        let { type, name } = answers;
        const spinner = ora(chalk.yellow(`构建${name}并下载...`)).start();
        // 过滤 unicode 字符
        name = name.replace(/[\u0000-\u0019]/g, '')
        const mkdtemp = fs.mkdtempSync('agul-');
        fs.cpSync(path.resolve(__dirname, '../umi-template'), path.resolve(__dirname, `../${mkdtemp}`), { recursive: true });
        await outPutUmirc(type, name, mkdtemp)
        await outPutNginx(type, name, mkdtemp)
        // 复制加入模板后的项目到用户本地
        fs.cpSync(path.resolve(__dirname, `../${mkdtemp}`), name, { recursive: true });
        // 删除临时目录
        deleteFolderRecursive(path.resolve(__dirname, `../${mkdtemp}`))
        setTimeout(() => {
            spinner.succeed(chalk.cyan(`${name}下载成功！`))
        }, 1000);
        // shell.cd(name)
        // shell.exec('npm install')
        // console.log('over')
        // shell.exit()
    })
