const { startApi, getProposal, pingWithEventHandlers } = require("./apicommands.js")
const { conf, status } = require("./conf")

export const getStatus = () => {
    //const status = {}
    if (!conf.api) {
        status["api"] = "not connected"
    }
    else if (conf.fail) {
        status["api"] = "fail"
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
    if (conf.response) {
        status["response"] = conf.response
    }
    return status
}

export const startLive = async (params) => {
    if (conf.fail && params && params.key && params.appid) {
        conf.key = params.key;
        conf.appid = params.appid
        await startApi()
    }
    else {
        return getStatus()
    }
}

export const openTrade = (params) => {
    if (!conf.fail && params) {

        params.amount = parseFloat(params.amount) || 1
        getProposal(params)
    }
    return getStatus()
}

export const ping = () => {
    if (!conf.fail) {
        pingWithEventHandlers()
    }
    return getStatus()
}