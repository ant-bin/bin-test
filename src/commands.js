const { startApi, getProposal, pingWithEventHandlers } = require("./apicommands.js")

export const getStatus = (conf) => {
    const status = {}
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

export const startLive = (conf, params) => {
    if (!conf.api && params && params.key && params.appid) {
        conf.key = params.key;
        conf.appid = params.appid
        console.log(conf, params)
        startApi(conf)
    }
    return getStatus(conf)
}

export const openTrade = (conf, params) => {
    if (conf.api && params) {

        console.log(params)
        //getProposal(conf, params)
    }
    return getStatus(conf)
}

export const ping = (conf) => {
    if (conf.api) {
        pingWithEventHandlers(conf)
    }
    return getStatus(conf)
}