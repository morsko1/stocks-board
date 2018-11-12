export const urlStocks = 'https://iss.moex.com/iss/engines/stock/markets/shares/boards/tqbr/securities.json?iss.meta=off&iss.only=securities,marketdata&securities.columns=SECID,SHORTNAME,PREVPRICE,SECNAME,DECIMALS&marketdata.columns=SECID,LAST,LOW,HIGH,OPEN,VALTODAY_RUR,ISSUECAPITALIZATION';

export const getUrlStock = (ticker) => `https://iss.moex.com/iss/engines/stock/markets/shares/boards/tqbr/securities/${ticker}.json?iss.meta=off&iss.only=securities,marketdata&securities.columns=SECID,SHORTNAME,PREVPRICE,SECNAME,DECIMALS&marketdata.columns=SECID,LAST,LOW,HIGH,OPEN,VALTODAY_RUR,ISSUECAPITALIZATION`;

export const urlCurrencies = 'https://iss.moex.com/iss/statistics/engines/futures/markets/indicativerates/securities.json?iss.meta=off&iss.only=securities&securities.columns=secid,rate';

export const getUrlDailyChart = (ticker) => `https://iss.moex.com/iss/history/engines/stock/markets/shares/boards/tqbr/securities/${ticker}.json?iss.meta=off&sort_order_desc=desc&history.columns=TRADEDATE,CLOSE`;
