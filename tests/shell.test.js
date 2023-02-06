const deploy = require('../deploy');
const { payload } = require('./helpers');
const fs = require('fs/promises');
const os = require('os');
jest.setTimeout(30000);

test('Run deploy shell script', async () => {
    const result = await deploy(
        payload.repository.ssh_url
        , payload.repository.name);
    const deployFolder = await fs.readdir(
        `${os.homedir}/whdeploys/${payload.repository.name}`
    );
    expect(deployFolder).toContain('node_modules');
});