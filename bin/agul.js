#!/usr/bin/env node
const program = require('commander')
// 定义当前版本
// 定义使用方法
// 定义四个指令
program
    .version(require('../package').version)
    .usage('<command> [options]')
    .command('create', 'create a new project')
// 解析命令行参数
program.parse(process.argv)