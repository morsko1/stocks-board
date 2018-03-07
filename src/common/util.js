export const url = 'https://iss.moex.com/iss/engines/stock/markets/shares/boards/tqbr/securities.json?iss.meta=off&iss.only=securities,marketdata&securities.columns=SECID,SHORTNAME,PREVPRICE,SECNAME,DECIMALS&marketdata.columns=SECID,LAST,LOW,HIGH,OPEN,VALTODAY_RUR,ISSUECAPITALIZATION';

// url
// "columns securities": ["SECID", "SHORTNAME", "PREVPRICE", "SECNAME", "DECIMALS"],
// "columns marketdata": ["SECID", "LAST", "LOW", "HIGH", "OPEN", "VALTODAY_RUR", "ISSUECAPITALIZATION"],

export const convertStocksResponseToStocks = (data) => {
    let securities = data.securities.data.map(item => {
        return {
            ticker: item[0],
            shortName: item[1],
            fullName: item[3],
            prevPrice: item[2],
            precision: item[4],
        }
    });
    let marketData = data.marketdata.data.map(item => {
        return {
            last: item[1],
            low: item[2],
            high: item[3],
            open: item[4],
            volumeToday: item[5],
            capitalization: item[6],
        }
    });

    let result = [];
    for (let i = 0; i < securities.length; i++) {
        let item = {
            ...securities[i],
            ...marketData[i]
        }
        result.push(item);
    }
    result.sort((a, b) => {
        return b.capitalization - a.capitalization;
    });

    return result;
}
