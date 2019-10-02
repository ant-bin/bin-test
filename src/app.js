const ws = require("ws")
//const LiveApi = require('binary-live-api').LiveApi;
const express = require('express');
const url = require('url');
const PORT = process.env.PORT || 9090

const { conf, status } = require("./conf")
const { getStatus, openTrade, ping, startLive } = require("./commands.js")

const app = express();
const server = require('http').createServer(app);

app.use(express.static(__dirname + '/node_modules'));
app.use(express.json({}));
app.use(express.urlencoded({ extended: true }));
app.use((err, req, res, next) => {
    if (err) {
        console.log('Invalid Request data')
        res.send('Invalid Request data')
    } else {
        next()
    }
})
app.use((req, res, next) => {
    console.log("REQUEST: ", req.hostname, req.method, req.originalUrl, req.body)
    next()
})
app.get('/', async (req, res, next) => {
    if (req.query.cmd && req.query.cmd === "status") {
        return res.json(getStatus());
    }
    if (req.query.cmd && req.query.cmd === "ping") {

        let pingret = await ping()
        return res.json(pingret);
    }
    if (req.query.cmd && req.query.cmd === "balance") {
        return res.json(conf.balance);
    }
    res.sendFile(__dirname + '/index.html');
});

app.post('/', async (req, res, next) => {
    if (req.query.cmd && req.query.cmd === "start") {

        await startLive(req.body)
        return res.json(getStatus());
    }
    if (req.query.cmd && req.query.cmd === "open") {

        const openRet = await openTrade(req.body)
        return res.json(openRet);
    }

    res.sendFile(__dirname + '/index.html');
});

server.listen(PORT);

//const api = new LiveApi({ websocket: ws });
//console.log(api)