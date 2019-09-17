var ws = require('ws');
var LiveApi = require('binary-live-api').LiveApi;

var api = new LiveApi({ websocket: ws, appId: ***REMOVED*** });
api.authorize('***REMOVED***').then(
()=>{
	console.log("OK");
	getPortfolio();
	//getProposal(newReq);
	//getProfitTable(profReq);
},
()=>console.log("Fail")
);
//console.log(api);

function pingWithEventHandlers() {
    api.events.on('ping', function(response) {
        console.log(response);
    });
    api.ping();
}
function tradingTimesDemo() {
    api.events.on('trading_times', function(response) {
        //console.log(response.trading_times.markets);
	var markets = response.trading_times.markets
	markets.map((market) => {
		console.log(market)
	});
//submarkets
    });
    api.getTradingTimes(new Date());
}

function getPortfolio(){
	api.events.on('portfolio', function(data) {
	    // do stuff with portfolio data
		//console.log(data);
		var pt = data.portfolio.contracts;
		pt.map((contract) => {
			console.log(contract);
		});
	});
	api.getPortfolio();
}

function getActiveSymbolsBrief(){
	api.events.on('active_symbols', function(data) {
	    // do stuff with portfolio data
		//console.log(data);
		var as = data.active_symbols;
		as.map((symbol) => {
			console.log(symbol.display_name+" "+symbol.symbol);	
		});
	});
	api.getActiveSymbolsBrief();
}


function getProposal(req){
	api.events.on('proposal', function(data) {
	    // do stuff with portfolio data
		//console.log(data);
		var prop = data.proposal;
		console.log(prop.spot+" "+prop.id);
		api.buyContract(prop.id,1.10);
	});
	api.getPriceProposalForContract(req);
}


pingWithEventHandlers();
//tradingTimesDemo();
//getPortfolio();
//getActiveSymbolsBrief();

newReq = {
	"amount": 1,
	"basis": "payout",
	"contract_type": "PUT",
	"currency": "USD",
	"duration": 5,
	"duration_unit": "m",
	"symbol": "frxEURUSD"
}	

//getProposal(newReq);

function getRealityCheckSummary(){
	api.events.on('reality_check', function(data) {
	    // do stuff with portfolio data
		console.log(data);
	});
	api.getRealityCheckSummary();
}

var profReq = {
	"description": 1,
	"limit": 3,
	"sort": "DESC"
}

function getProfitTable(req){
	api.events.on('profit_table', function(data) {
	    // do stuff with portfolio data
		//console.log(data);
		var pt = data.profit_table;
		pt.transactions.map((transaction) => {
			console.log(transaction);
		});
	});
	api.getProfitTable(req);
}

