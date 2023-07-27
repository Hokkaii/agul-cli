import inquirer, { QuestionCollection } from "inquirer";
import ora from "ora";
const path = require("path");
const shell = require("shelljs");
const RepositoryList: any = {
  "agul-library": "https://igitlab.iauto.com/hujunlei/iauto-react-ui",
  test: "https://igitlab.iauto.com/liuweiyi/training-platform-ms",
};

const PROMPT_LIST: QuestionCollection = [
  {
    type: "input",
    message: "enter your projectName",
    name: "projectName",
    default: "demo",
  },
  {
    type: "list",
    message: "choose download template",
    name: "templateName",
    choices: ["agul-library", "test"],
  },
];
interface IPromptOption {
  /**
   * 项目名
   */
  projectName: string;
  /**
   * 下载的模板名
   */
  templateName: string;
}
// 处理下载事件
async function handleDownload(options: IPromptOption) {
  const newOra = ora("start download template").start();
  try {
    const { projectName, templateName } = options; // 获取用户填写的选项
    shell.cd(
      process.env.NODE_ENV === "production"
        ? path.resolve(__dirname)
        : path.resolve(__dirname, "..")
    );
    shell.exec(
      `git clone ${RepositoryList[templateName]} ${projectName}`,
      { silent: true },
      function (code: number, _: any, stderr: any) {
        if (code === 0) {
          newOra.succeed("download template success");
        } else {
          newOra.fail(stderr);
        }
      }
    );
  } catch (err) {
    console.log(err);
    newOra.fail("download fail");
  }
}
function entry() {
  inquirer.prompt<IPromptOption>(PROMPT_LIST).then(async (answer) => {
    handleDownload(answer);
  });
}

entry();
