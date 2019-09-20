const { startApi, getProposal, pingWithEventHandlers } = require("./apicommands.js")
const { conf, status } = require("./conf")

export const getStatus = () => {
    //const status = {}
    if (!conf.api) {
        status["api"] = "not connected"
    }
    else {
        status["api"] = "online"
    }
    if (!conf.appid) {
        status["appid"] = "none"
    }
    else {
        status["appid"] = conf.appid
    }
    if(conf.response){
        status["response"] = conf.response
    }
    return status
}

export const startLive = (params) => {
    if (!conf.api && params && params.key && params.appid) {
        conf.key = params.key;
        conf.appid = params.appid
        console.log(conf, params)
        startApi()
    }
    return getStatus()
}

export const openTrade = (params) => {
    if (conf.api && params) {

        conf.params = params
        getProposal(params)
    }
    return getStatus()
}

export const ping = () => {
    if (conf.api) {
        pingWithEventHandlers()
    }
    return getStatus()
}