const {
    buyContract,
    startApi,
    getProposal,
    pingWithEventHandlers,
    subscribeToBalance,
    subscribeToAllOpenContracts
} = require("./apicommands.js")
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
        await subscribeToBalance()
        await subscribeToAllOpenContracts()
    }
    else {
        return getStatus()
    }
}

export const openTrade = async (params) => {
    if (!conf.fail && params) {

        params.amount = parseFloat(params.amount) || 1
        const proposal = await getProposal(params)
        const contract = await buyContract(proposal)
        return contract
    }
    return { contract_id: 0, msg: "auth first" } //if no auth - set contract_id to zero
}

export const ping = async () => {
    if (!conf.fail) {
        return pingWithEventHandlers()
    }
    return getStatus()
}