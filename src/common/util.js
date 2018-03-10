export const url = 'https://iss.moex.com/iss/engines/stock/markets/shares/boards/tqbr/securities.json?iss.meta=off&iss.only=securities,marketdata&securities.columns=SECID,SHORTNAME,PREVPRICE,SECNAME,DECIMALS&marketdata.columns=SECID,LAST,LOW,HIGH,OPEN,VALTODAY_RUR,ISSUECAPITALIZATION';

// url
// "columns securities": ["SECID", "SHORTNAME", "PREVPRICE", "SECNAME", "DECIMALS"],
// "columns marketdata": ["SECID", "LAST", "LOW", "HIGH", "OPEN", "VALTODAY_RUR", "ISSUECAPITALIZATION"],

export const convertStocksResponseToStocks = (data, sort) => {
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
        const change = item[1] && item[4] ? (((item[1] - item[4]) / item[4]) * 100).toFixed(2) : null
        return {
            last: item[1],
            low: item[2],
            high: item[3],
            open: item[4],
            volumeToday: item[5],
            capitalization: item[6],
            change: change,
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

    result = result.filter(item => item.prevPrice !== null);
    result.sort((a, b) => {
        if (sort.orderByDesc) {
            return a[sort.parameter] - b[sort.parameter];
        }
        return b[sort.parameter] - a[sort.parameter];
    });

    return result;
}

const sortDataBy = (data, sort) => {
    return data.sort((a, b) => {
        if (sort.orderByDesc) {
            return a[sort.parameter] - b[sort.parameter]
        }
        return b[sort.parameter] - a[sort.parameter]
    })
}

// if stocks data exist in state => set 'previousPrice' property for each stock
export const setStocksData = (nextData, previousData, sort) => {
    if (!previousData.length) {
        return sortDataBy(nextData, sort)
    }
    for (let i = 0; i < nextData.length; i++) {
        nextData[i].previousPrice = previousData[i].last
    }
    return sortDataBy(nextData, sort)
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

export const setFiltersState = (data, filter, type, value) => {
    return data.map(item => {
        if (item.name === filter) {
            switch (type) {
                case 'from': {
                    item.from = value;
                    break;
                }
                case 'to': {
                    item.to = value;
                    break;
                }
                default: {}
            }
        }
        return item;
    });
}

export const filterStocks = (data, filters, sort) => {
    if (!data.length) return [];
    const filtered = data.filter(stock => {
        for (let i = 0; i < filters.length; i++) {
            if ((stock[filters[i].name] >= (filters[i].from || 0)) &&
                (stock[filters[i].name] <= (filters[i].to || Infinity))) {
                if (i === filters.length - 1) {
                    return stock;
                }
            } else {
                break;
            }
        }
        return false;
    });
    return sortDataBy(filtered, sort);
}
