const {
    buyContract,
    startApi,
    getProposal,
    pingWithEventHandlers,
    subscribeToBalance,
    subscribeToAllOpenContracts
} = require("./apicommands.js")
const { conf, status, opentrades } = require("./conf")

export const getStatus = (q = { cmd: "status" }) => {
    //console.log(opentrades.length)
    const ot = {}
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
    if (q.contract_id !== undefined) {
        const contract_id = parseInt(q.contract_id)
        const otidx = opentrades.findIndex((el => contract_id === el.contract_id))
        //console.log(q, contract_id, otidx)
        if (-1 < otidx) {
            return { ...status, ot: opentrades[otidx] }
        }
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