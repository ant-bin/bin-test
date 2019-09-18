//var api = new LiveApi({ websocket: ws, appId: appId });
/* api.authorize(key).then(
    () => {
        console.log("OK");
        getPortfolio();
        subscribeToAllOpenContracts();
        subscribeToTransactions();
        //getProposal(newReq);
        //getProfitTable(profReq);
    },
    () => console.log("Fail")
); */

export const pingWithEventHandlers = () => {
    api.events.on('ping', function (response) {
        console.log(response);
    });
    api.ping();
}

export const  tradingTimesDemo = () => {
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
    api.events.on('proposal', function (data) {
        // do stuff with portfolio data
        //console.log(data);
        var prop = data.proposal;
        console.log(prop.spot + " " + prop.id);
        api.buyContract(prop.id, 1.10);
    });
    api.getPriceProposalForContract(req);
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