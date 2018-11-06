import React from 'react';
import './index.scss';
import * as util from '~/common/util';
import Layout from '~/common/components/Layout/Layout.js';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faAngleDoubleUp,
    faAngleDoubleDown
} from '@fortawesome/free-solid-svg-icons';

const getTableHead = (props) => {
    const getSortArrow = (parameter) => {
        return props.sort.parameter === parameter ?
            (props.sort.orderByDesc ? '\u2191' : '\u2193') :
            null;
    }
    return (
        <tr onClick={(event) => {props.sortRowsBy(event.target.dataset.sortParameter)}}>
            <th key={'head_ticker'} className={'all-stocks__col_fixed'}>{'Тикер'}</th>
            <th key={'head_name'}>{'Наим.'}</th>
            <th
                key={'head_prev'}
                className={getSortArrow('prevPrice') ? 'all-stocks__table-stocks-head_active' : ''}
                data-sort-parameter={'prevPrice'}>
                {'Цена,'}
                <br/>
                {'закр'}
                <br/>
                {
                    getSortArrow('prevPrice')
                }
            </th>
            <th
                key={'head_open'}
                className={getSortArrow('open') ? 'all-stocks__table-stocks-head_active' : ''}
                data-sort-parameter={'open'}>
                {'Цена,'}
                <br/>
                {'откр'}
                <br/>
                {
                    getSortArrow('open')
                }
            </th>
            <th
                key={'head_last'}
                className={getSortArrow('last') ? 'all-stocks__table-stocks-head_active' : ''}
                data-sort-parameter={'last'}>
                {'Цена,'}
                <br/>
                {'посл'}
                <br/>
                {
                    getSortArrow('last')
                }
            </th>
            <th
                key={'head_change'}
                className={getSortArrow('change') ? 'all-stocks__table-stocks-head_active' : ''}
                data-sort-parameter={'change'}>
                {'% изм'}
                <br/>
                {
                    getSortArrow('change')
                }
            </th>
            <th
                key={'head_volume'}
                className={getSortArrow('volumeToday') ? 'all-stocks__table-stocks-head_active' : ''}
                data-sort-parameter={'volumeToday'}>
                {'Объем,'}
                <br/>
                {'млн р'}
                <br/>
                {
                    getSortArrow('volumeToday')
                }
            </th>
            <th
                key={'head_cap'}
                className={getSortArrow('capitalization') ? 'all-stocks__table-stocks-head_active' : ''}
                data-sort-parameter={'capitalization'}>
                {'Кап-ция,'}
                <br/>
                {'млрд р'}
                <br/>
                {
                    getSortArrow('capitalization')
                }
            </th>
        </tr>
    );
}

const getTableRow = (item, props) => {
    // const usdRub = props.currencies.data.length &&
    //     props.currencies.data.find(item => item.name === 'USD/RUB').value;
    // const capToDollars = parseFloat(item.capitalization / (1000000000 * usdRub)).toFixed(3);

    return (
        <tr
            key={`row_${item.ticker}`}
            className={'all-stocks__table-stocks-row'}
            onClick={() => {
                props.changePage(item.ticker);
            }}>
            <td key={`col_ticker${item.ticker}`} className={'all-stocks__col_fixed'}>{item.ticker}</td>
            <td key={`col_name${item.ticker}`}>{item.shortName}</td>
            <td key={`col_prev${item.ticker}`}>{item.prevPrice}</td>
            <td key={`col_open${item.ticker}`}>{item.open}</td>
            <td
                key={`col_last${item.ticker}`}
                className={util.getClassNameForCellColor(item.last - item.previousPrice)}>
                {item.last}
            </td>
            <td
                key={`col_change${item.ticker}`}
                className={util.getClassNameForChangeFont(item.change)}>
                {item.change ? item.change + ' %' : ''}
            </td>
            <td key={`col_volume${item.ticker}`}>{(item.volumeToday / 1000000).toFixed(2)}</td>
            <td key={`col_cap${item.ticker}`}>{(item.capitalization / 1000000000).toFixed(3)}</td>
        </tr>
    );
}

const getFiltersView = (props) => {
    const filtersInput = JSON.parse(JSON.stringify(props.filtersInput));
    const getInputValue = (filterName, type) => {
        return props.filtersInput ? props.filtersInput.find(item => item.name === filterName)[type] : '';
    }

    return (
        <div className={'all-stocks__filters-container .all-stocks__centered-content'}>
            <div className={'all-stocks__filters'}>
                <form
                    className={'all-stocks__filters-form'}
                    onChange={(event) => props.handleFiltersInput(
                        event.target.dataset.filterName,
                        event.target.dataset.inputType,
                        event.target.value
                    )}
                    onSubmit={(event) => {
                        event.preventDefault();
                        props.applyFilters(filtersInput);
                    }}
                >
                    <table className={'all-stocks__filters-table'}>
                        <tbody>
                            <tr>
                                <td className={'all-stocks__filters-table-td-label'}>Объем, млн р:</td>
                                <td>
                                    от
                                    <input
                                        type={'number'}
                                        data-filter-name={'volumeToday'}
                                        data-input-type={'from'}
                                        value={getInputValue('volumeToday', 'from')}
                                        onChange={() => getInputValue('volumeToday', 'from')}
                                    />
                                </td>
                                <td>
                                    до
                                    <input
                                        type={'number'}
                                        data-filter-name={'volumeToday'}
                                        data-input-type={'to'}
                                        value={getInputValue('volumeToday', 'to')}
                                        onChange={() => getInputValue('volumeToday', 'to')}
                                    />
                                    <br/>
                                </td>
                            </tr>
                            <tr>
                                <td className={'filters-table-td-label'}>Кап-ция, млрд р:</td>
                                <td>
                                    от
                                    <input
                                        type={'number'}
                                        data-filter-name={'capitalization'}
                                        data-input-type={'from'}
                                        value={getInputValue('capitalization', 'from')}
                                        onChange={() => getInputValue('capitalization', 'from')}
                                    />
                                </td>
                                <td>
                                    до
                                    <input
                                        type={'number'}
                                        data-filter-name={'capitalization'}
                                        data-input-type={'to'}
                                        value={getInputValue('capitalization', 'to')}
                                        onChange={() => getInputValue('capitalization', 'to')}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className={'all-stocks__centered-content'}>
                        <button
                            type={'submit'}
                            className={'all-stocks__button-apply-filters'}
                        >
                            {'применить'}
                        </button>
                        <button
                            className={'all-stocks__button-reset-filters'}
                            onClick={() => {
                                props.resetFiltersInput();
                                props.resetFilters();
                            }}
                        >
                            {'сбросить'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

const getFiltersButton = (props) => {
    return (
        <div className={'all-stocks__filters-button-container'}>
            <button
                className={'all-stocks__filters-button'}
                onClick={() => {
                    if (props.isFiltersVisible) {
                        // reset react state
                        props.resetFiltersInput();
                        props.resetFilters();
                    }
                    props.showOrHideFilters();
                }}
            >
            {
                `фильтры ${props.isFiltersVisible ? '\u2191': '\u2193'}`
            }
            </button>
        </div>
    );
}

const getTable = (props) => {
    return (
        props.stocks.data.length ?
            <table className={'all-stocks__table-stocks'}>
                <tbody>
                {
                    getTableHead(props)
                }
                {
                    props.stocks.data.slice(0, props.numberRowsToShow).map(item => getTableRow(item, props))
                }
                </tbody>
            </table> :
            <div className={'all-stocks__centered-content'}>{'Нет данных'}</div>
    );
}

const getTableFiltered = (props) => {
    return (
        props.filteredStocks.data.length ?
            <table className={'all-stocks__table-stocks'}>
                <tbody>
                {
                    getTableHead(props)
                }
                {
                    props.filteredStocks.data.slice(0, props.numberRowsToShow).map(item => getTableRow(item, props))
                }
                </tbody>
            </table> :
            <div className={'all-stocks__centered-content'}>{'Нет данных'}</div>
    );
}

const getTableControls = (props) => {
    return (
        <div className={'all-stocks__table-controls'}>
            <div
                className={'all-stocks__table-controls-button'}
                onClick={() => {props.collapseTable()}}
            >
                <FontAwesomeIcon icon={faAngleDoubleUp} />
            </div>
            <div
                className={'all-stocks__table-controls-button'}
                onClick={() => {props.expandTable()}}
            >
                <FontAwesomeIcon icon={faAngleDoubleDown} />
            </div>
        </div>
    );
}

// todo: handle fetchStocks error - props.stocksFetchingError
const FullTableView = (props) => {
    return (
        <Layout>
        {
            props.stocksFetching && !props.stocks.data.length ?
                <div className={'all-stocks__loader'} /> :
                <div className={'all-stocks'}>
            {
                getFiltersButton(props)
            }
            {
                getFiltersView(props)
            }
                <div className={'all-stocks__inner'}>
                    <div className={'all-stocks__table-stocks-container'}>
                    {
                        props.isFiltersVisible ?
                            getTableFiltered(props) :
                            getTable(props)
                    }
                    </div>
                </div>
            {
                getTableControls(props)
            }
                </div>
        }
        </Layout>
    );
}

export default FullTableView;
