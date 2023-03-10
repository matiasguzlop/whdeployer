const { exec } = require('child_process');

const deploy = (sshURL, repoName, commitHash) => new Promise(
    (resolve, reject) => {
        console.log(`[${new Date().toISOString()}] Running deploying script for ${repoName}, commit ${commitHash}`);
        exec(`sh ./deploy.sh ${sshURL} ${repoName}`, (error, stdout, stderr) => {
            if (error) {
                console.error(error);
                // reject(error); //this is stopping the process when git clone return. TODO: workaround
            }
            if (stderr) {
                console.error("[STDERR]:", error);
                // reject(error); //this is stopping the process when git clone return. TODO: workaround
            }
            resolve(stdout);
        });
    });

module.exports = deploy;