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
    if (sort) {
        result.sort((a, b) => {
            if (sort.orderByDesc) {
                return a[sort.parameter] - b[sort.parameter];
            }
            return b[sort.parameter] - a[sort.parameter];
        });
    }

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

const sortDataByParameter = (data, parameter) => {
    return data.sort((a, b) => {
        return b[parameter] - a[parameter]
    })
}

// if stocks data exist in state => set 'previousPrice' property for each stock
export const setStocksDataWithoutSort = (nextData, previousData) => {
    if (!previousData.length) {
        return sortDataByParameter(nextData, 'volumeToday');
    }
    for (let i = 0; i < nextData.length; i++) {
        nextData[i].previousPrice = previousData[i].last;
    }
    return sortDataByParameter(nextData, 'volumeToday');
}

export const getClassNameForCellColor = (diff) => {
    switch (true) {
        case diff > 0: {
            return 'price-upper';
        }
        case diff < 0: {
            return 'price-lower';
        }
        default: {
            return '';
        }
    }
}

export const getClassNameForChangeFont = (diff) => {
    switch (true) {
        case diff > 0: {
            return 'change-up-font';
        }
        case diff < 0: {
            return 'change-down-font';
        }
        default: {
            return '';
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

export const convertCurrenciesResponseToCurrencies = (data) => {
    return data.securities.data.map(item => {
        return {
            name: item[0],
            value: item[1]
        };
    });
}

export const resetFilters = (data) => {
    return data.map(item => {
        Object.keys(item).map(prop => {
            if (prop !== 'name') {
                item[prop] = ''
            }
            return false;
        })
        return item;
    })
}

export const convertFiltersValues = (data) => {
    return data.map(item => {
        Object.keys(item).map(prop => {
            switch (item.name) {
                case 'volumeToday': {
                    if (prop !== 'name') {
                        item[prop] = item[prop] ? item[prop] * 1000000 : '';
                    }
                    break;
                }
                case 'capitalization': {
                    if (prop !== 'name') {
                        item[prop] = item[prop] ? item[prop] * 1000000000 : '';
                    }
                    break;
                }
                default: {}
            }
            return false;
        });
        return item;
    });
}

export const convertStockHistoryDataResponseToStockHistoryData = (data) => {
    return data.history.data.map(item => {
        return {
            date: item[0],
            value: item[1]
        };
    }).reverse();
}

export const convertStockResponseToStock = (data) => {
    const item = data.securities.data[0];
    return {
        ticker: item[0],
        shortName: item[1],
        prevPrice: item[2],
        fullName: item[3]
    };
}
