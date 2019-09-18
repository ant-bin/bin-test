const ws = require("ws")
const LiveApi = require('binary-live-api').LiveApi;
const { pingWithEventHandlers } = require("./commands.js")
const express = require('express');
const url = require('url');
const PORT = process.env.PORT || 9090


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
app.get('/', function (req, res, next) {
    res.sendFile(__dirname + '/index.html');
});

server.listen(PORT);

//const api = new LiveApi({ websocket: ws });
//console.log(api)