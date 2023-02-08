const bodyParser = require('body-parser');
const express = require('express');
const crypto = require('node:crypto');
const deploy = require('./deploy');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());

app.post('/', async (req, res) => {
    try {
        const signature = req.headers["x-hub-signature-256"];

        const expectedSignature = "sha256=" +
            crypto.createHmac("sha256", process.env.WEBHOOK_SECRET)
                .update(JSON.stringify(req.body))
                .digest("hex");

        if (signature !== expectedSignature)
            throw new Error("Invalid signature.");

        const branch = req.body?.ref?.split("/").at(-1);

        if (branch && req.body.repository.default_branch !== branch) {
            console.log("Push from no master branch, rejected deployment");
            res.status(304).end();
            return;
        }

        deploy(req.body.repository.ssh_url, req.body.repository.name);

        res.status(200).end();
    } catch (error) {
        console.log(error);
        res.status(401).json(error);
    }
});

process.env.NODE_ENV !== 'test' &&
    app.listen(3000, () => console.log("Webhooks Deployer Server started"));


module.exports = app;