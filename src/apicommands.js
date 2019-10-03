const ws = require("ws")
const LiveApi = require('binary-live-api').LiveApi;
const { conf, opentrades } = require("./conf")

export const startApi = async () => {

    //console.log(conf);return;
    conf.api = new LiveApi({ websocket: ws, appId: conf.appid });
    return conf.api.authorize(conf.key).then(
        () => {
            console.log("OK");
            conf.fail = false
        },
        (err) => {
            console.log("Fail")
            console.log(err.error)
            conf.fail = true
        }
    );
}

export const subscribeToBalance = async () => {
    conf.api.events.on('balance', function (response) {
        //console.log(response)
        conf.balance = response.balance
    });
    return conf.api.subscribeToBalance().then(
        (response) => { return response },
        (error) => { return error }
    );
}

export const pingWithEventHandlers = async () => {
    return conf.api.ping().then(
        (response) => { return response },
        (error) => { return error }
    );
}

export const tradingTimesDemo = () => {
    api.events.on('trading_times', function (response) {
        //console.log(response.trading_times.markets);
        var markets = response.trading_times.markets
        markets.map((market) => {
            console.log(market)
        });
        //submarkets
    });
    api.getTradingTimes(new Date());
}

export const getPortfolio = () => {
    api.events.on('portfolio', function (data) {
        // do stuff with portfolio data
        //console.log(data);
        var pt = data.portfolio.contracts;
        pt.map((contract) => {
            console.log(contract);
        });
    });
    api.getPortfolio();
}

export const getActiveSymbolsBrief = () => {
    api.events.on('active_symbols', function (data) {
        // do stuff with portfolio data
        //console.log(data);
        var as = data.active_symbols;
        as.map((symbol) => {
            console.log(symbol.display_name + " " + symbol.symbol);
        });
    });
    api.getActiveSymbolsBrief();
}

export const getProposal = async (req) => {
    return conf.api.getPriceProposalForContract(req)
        .then(
            (response) => {
                //console.log("getProposal - ok", response)
                var prop = response.proposal;
                console.log(prop.spot + " " + prop.id, (prop.spot * 1.1).toFixed(2));
                var max_cPrice = prop.spot * parseFloat(req.amount) * 1.1;
                return { id: prop.id, "max_cPrice": max_cPrice.toFixed(2), success: true }
            },
            (err) => {
                console.log("getProposal - fail", err)
                return { success: false }
            }
        );
}

export const buyContract = async (req) => {
    return conf.api.buyContract(req.id, req.max_cPrice).then(
        (response) => {
            console.log(response)
            const contract = {
                contract_id: response.buy.contract_id,
                start_time: response.buy.start_time,
                transaction_id: response.buy.transaction_id,
            }
            //status.trades.push(contract)
            return contract
        },
        (err) => {
            console.log(err.error)
            return { contract_id: 0 } //if error - set contract_id to zero
        }
    )
}

export const newReq = {
    "amount": 1,
    "basis": "stake",
    "contract_type": "PUT",
    "currency": "USD",
    "duration": 10,
    "duration_unit": "m",
    "symbol": "frxEURUSD"
}

export const getRealityCheckSummary = () => {
    api.events.on('reality_check', function (data) {
        // do stuff with portfolio data
        console.log(data);
    });
    api.getRealityCheckSummary();
}

export const profReq = {
    "description": 1,
    "limit": 3,
    "sort": "DESC"
}

export const getProfitTable = (req) => {
    api.events.on('profit_table', function (data) {
        // do stuff with portfolio data
        //console.log(data);
        var pt = data.profit_table;
        pt.transactions.map((transaction) => {
            console.log(transaction);
        });
    });
    api.getProfitTable(req);
}

export const subscribeToTransactions = async () => {
    conf.api.events.on('transaction', function (data) {
        // do stuff with portfolio data
        console.log(data);
    });
    conf.api.subscribeToTransactions().then(
        (response) => { return response },
        (error) => { return error }
    );
}

export const subscribeToAllOpenContracts = async () => {
    conf.api.events.on('proposal_open_contract', function (data) {
        // do stuff with portfolio data
        const open_contract = data.proposal_open_contract
        //console.log("O: ", open_contract);
        if (open_contract.contract_id === undefined) return
        const tradeIndex = opentrades.findIndex((obj => obj.contract_id === open_contract.contract_id))
        if (-1 < tradeIndex) {
            opentrades[tradeIndex] = open_contract
        }
        else {
            opentrades.push(open_contract)
        }
    });
    return conf.api.subscribeToAllOpenContracts().then(
        (response) => { return response },
        (error) => { return error }
    );
}