const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');


const writeFile = async (path, content) => {

    if (fs.existsSync(path)) {
        // 提示用户是否确认覆盖
        const { chose } = await inquirer.prompt([ // 配置询问方式
            {
                name: 'chose',
                type: 'list', // 类型
                message: '此文件已存在是否覆盖?',
                choices: [
                    { name: '覆盖', value: 'overwrite' },
                    { name: '取消', value: false }
                ]
            }
        ]);

        if (!chose) {
            return;
        } else if (chose === 'overwrite') {
            return fs.promises.writeFile(path, content);
        }
    } else {
        return fs.promises.writeFile(path, content);

    }
}

const mkdirSync = (dirname) => {
    if (fs.existsSync(dirname)) {
        return true
    } else {
        // 不存在,判断父亲文件夹是否存在？
        if (mkdirSync(path.dirname(dirname))) {
            // 存在父亲文件，就直接新建该文件
            fs.mkdirSync(dirname)
            return true
        }
    }
}
const copyFile = (sourcePath, targetPath) => {
    const sourceFile = fs.readdirSync(sourcePath, { withFileTypes: true })

    sourceFile.forEach(file => {
        const newSourcePath = path.resolve(sourcePath, file.name)
        const newTargetPath = path.resolve(targetPath, file.name)
        if (file.isDirectory()) {
            isExist(newTargetPath)
            copyFile(newSourcePath, newTargetPath)
        }
        if (file.name.endsWith('.mp4')) { // 需要复制其他的格式的文件修改 .mp4 既可
            fs.copyFileSync(newSourcePath, newTargetPath)
        }
    })
}
const deleteFolderRecursive = function (path) {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function (file) {
            var curPath = path + "/" + file;
            if (fs.lstatSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};
module.exports = {
    writeFile,
    mkdirSync,
    copyFile,
    deleteFolderRecursive
}
