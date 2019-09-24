const ws = require("ws")
const LiveApi = require('binary-live-api').LiveApi;
const { conf, status } = require("./conf")

export const startApi = () => {

    //console.log(conf);return;
    conf.api = new LiveApi({ websocket: ws, appId: conf.appid });
    conf.api.authorize(conf.key).then(
        () => {
            console.log("OK");
            //getPortfolio();
            //subscribeToAllOpenContracts();
            //subscribeToTransactions();
            //getProposal(newReq);
            //getProfitTable(profReq);

        },
        () => console.log("Fail")
    );
}

export const pingWithEventHandlers = () => {
    conf.api.events.on('ping', function (response) {
        console.log(response);
        //conf.response = response
    });
    conf.api.ping();
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

export const getProposal = (req) => {
    conf.api.getPriceProposalForContract(req)
        .then(
            (response) => {
                //console.log("getProposal - ok", response)
                var prop = response.proposal;
                console.log(prop.spot + " " + prop.id, (prop.spot * 1.1).toFixed(2));
                conf.api.buyContract(prop.id, (prop.spot * 1.1).toFixed(2)).then(
                    (response) => {
                        //console.log(response)
                        const contract = {
                            contract_id: response.buy.contract_id,
                            start_time: response.buy.start_time,
                            transaction_id: response.buy.transaction_id,
                            spot: prop.spot
                        }
                        if (conf.trades === undefined) {
                            conf.trades = []
                        }
                        conf.trades.push(contract)
                    },
                    (err) => console.log(err)
                )
            },
            (err) => console.log("getProposal - fail", err)
        );
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

export const subscribeToTransactions = () => {
    api.events.on('transaction', function (data) {
        // do stuff with portfolio data
        console.log(data);
    });
    api.subscribeToTransactions();
}

export const subscribeToAllOpenContracts = () => {
    api.events.on('proposal_open_contract', function (data) {
        // do stuff with portfolio data
        console.log(data);
    });
    api.subscribeToAllOpenContracts();
}