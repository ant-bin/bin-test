const ws = require("ws")
//const LiveApi = require('binary-live-api').LiveApi;
const { pingWithEventHandlers } = require("./apicommands.js")
const { getStatus, startLive } = require("./commands.js")
const express = require('express');
const url = require('url');
const PORT = process.env.PORT || 9090


const app = express();
const server = require('http').createServer(app);

export const conf = {
    api: null,
    appid: null,
    key: null,
}

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
app.get('/', function (req, res, next) {
    if (req.query.cmd && req.query.cmd === "status") {
        return res.json(getStatus(conf));
    }
    res.sendFile(__dirname + '/index.html');
});

app.post('/', function (req, res, next) {
    if (req.query.cmd && req.query.cmd === "start") {

        return res.json(startLive(conf, req.body));
    }
    res.sendFile(__dirname + '/index.html');
});

server.listen(PORT);

//const api = new LiveApi({ websocket: ws });
//console.log(api)