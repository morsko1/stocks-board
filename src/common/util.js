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

// if stocks data exist in state => set 'previousPrice' property for each stock
export const setStocksData = (nextData, previousData) => {
    if (!previousData.length) {
        return nextData
    }
    for (let i = 0; i < nextData.length; i++) {
        nextData[i].previousPrice = previousData[i].last
    }
    return nextData
}

export const getClassNameForCellColor = (diff) => {
    switch (true) {
        case diff > 0: {
            return 'price-upper'
        }
        case diff < 0: {
            return 'price-lower'
        }
        default: {
            return ''
        }
    }
}

export const getClassNameForChangeFont = (diff) => {
    switch (true) {
        case diff > 0: {
            return 'change-up-font'
        }
        case diff < 0: {
            return 'change-down-font'
        }
        default: {
            return ''
        }
    }
}
