const core = require("@actions/core")
const {getInput, getBooleanInput, setFailed} = require('@actions/core');
const {exec, getExecOutput} = require('@actions/exec');

const validateBranchName = ({ branchName }) =>
        /^[a-zA-Z0-9_\-\.\/]+$/.test(branchName);
const validateDirectoryName = ({ dirName }) =>
        /^[a-zA-Z0-9_\-\/]+$/.test(dirName);

async function run() {
  core.info("I am a custom JS action");
  const baseBranch = getInput("base-branch");
  const targetBranch = getInput("target-branch");
  const workingDirectory = getInput("working-directory");
  const debug = getBooleanInput("debug");

  if (!validateBranchName(baseBranch) || !validateBranchName(targetBranch)) {
    setFailed("Branch names may only contain letters, digits, underscores, hyphens, dots, and forward slashes");
    return;
  }

  if (!validateDirectoryName(workingDirectory)) {
    setFailed("Directory paths may only contain letters, digits, underscores, hyphens, and forward slashes");
    return;
  }

  core.info(`Base branch: ${baseBranch}`);
  core.info(`Target branch: ${targetBranch}`);
  core.info(`Working directory: ${workingDirectory}`);

  await exec("npm update", [], {cwd: workingDirectory});
  const out = await getExecOutput("git status -s package*.json");
  if (out.stdout !== "") {
    core.info("There are updates available.");
  } else {
    core.info("There are no updates at this point in time.");
  }
}

run();
