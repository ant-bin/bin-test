const { startApi } = require("./apicommands.js")

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
    return status
}

export const startLive = (conf, params) => {
    if (params && params.key && params.appid) {
        conf.key = params.key;
        conf.appid = params.appid
    }
    console.log(conf, params)
    startApi(conf)
    return getStatus(conf)
}