import React from 'react';
import './index.css';
import * as util from '../../common/util'

const getTableHead = (props) => {
    const getSortArrow = (parameter) => {
        return props.sort.parameter === parameter ?
            (props.sort.orderByDesc ? '\u2191' : '\u2193') :
            null
    }
    return (
        <tr onClick={(event) => {props.sortRowsBy(event.target.dataset.sortParameter)}}>
            <th key={'head_ticker'}>{'Тикер'}</th>
            <th key={'head_name'}>{'Наименование'}</th>
            <th
                key={'head_prev'}
                className={getSortArrow('prevPrice') ? 'head-active' : ''}
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
                className={getSortArrow('open') ? 'head-active' : ''}
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
                className={getSortArrow('last') ? 'head-active' : ''}
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
                className={getSortArrow('change') ? 'head-active' : ''}
                data-sort-parameter={'change'}>
                {'% изм'}
                <br/>
                {
                    getSortArrow('change')
                }
            </th>
            <th
                key={'head_volume'}
                className={getSortArrow('volumeToday') ? 'head-active' : ''}
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
                className={getSortArrow('capitalization') ? 'head-active' : ''}
                data-sort-parameter={'capitalization'}>
                {'Капитализация,'}
                <br/>
                {'млрд $'}
                <br/>
                {
                    getSortArrow('capitalization')
                }
            </th>
        </tr>
    )
}

const getTableRow = (item, props) => {
    const usdRub = props.currencies.data.length &&
        props.currencies.data.find(item => item.name === 'USD/RUB').value
    const capToDollars = parseFloat(item.capitalization/(1000000000*usdRub)).toFixed(3);

    return (
        <tr key={`row_${item.ticker}`}>
            <td key={`col_ticker${item.ticker}`}>{item.ticker}</td>
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
            <td key={`col_volume${item.ticker}`}>{(item.volumeToday/1000000).toFixed(2)}</td>
            <td key={`col_cap${item.ticker}`}>{capToDollars}</td>
        </tr>
    );
}

const getFiltersView = (props) => {
    const getInputValue = (filterName, type) => {
        return props.filters ? props.filters.find(item => item.name === filterName)[type] : ''
    }
    // '\u2191' : '\u2193'
    return (
        <div className={'filters-container centered-content'}>
            <button className={'button-show-hide-filters'} onClick={props.showOrHideFilters}>
                {props.isFiltersVisible ? 'фильтры \u2191': 'фильтры \u2193'}
            </button>
            <div className={props.isFiltersVisible ? 'filters': 'hidden'}>
                <form
                    onChange={(event) => props.handleFiltersInput(
                        event.target.dataset.filterName,
                        event.target.dataset.inputType,
                        event.target.value
                    )}
                    onSubmit={(event) => {
                        event.preventDefault();
                        props.applyFilters()
                    }}>
                    <table className={'filters-table'}>
                        <tbody>
                            <tr>
                                <td>Объем:</td>
                                <td>
                                    от
                                    <input
                                        type={'number'}
                                        data-filter-name={'volumeToday'}
                                        data-input-type={'from'}
                                        size={'2'}
                                        value={getInputValue('volumeToday', 'from')}/>
                                </td>
                                <td>
                                    до
                                    <input
                                        type={'number'}
                                        data-filter-name={'volumeToday'}
                                        data-input-type={'to'}
                                        value={getInputValue('volumeToday', 'to')}/>
                                    <br/></td>
                            </tr>
                            <tr>
                                <td>Капитализация:</td>
                                <td>
                                    от
                                    <input
                                        type={'number'}
                                        data-filter-name={'capitalization'}
                                        data-input-type={'from'}
                                        value={getInputValue('capitalization', 'from')}/>
                                </td>
                                <td>
                                    до
                                    <input
                                        type={'number'}
                                        data-filter-name={'capitalization'}
                                        data-input-type={'to'}
                                        value={getInputValue('capitalization', 'to')}/>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div className={'centered-content'}>
                        <button className={'button-apply-filters'} onClick={props.applyFilters}>
                            {'применить'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}


const HomeView = props => (
    <div>
        <h3>Московская Биржа</h3>
        {getFiltersView(props)}
        {
            props.stocksFetching && !props.stocks.data.length ?
                <div className={'loader'} /> :
                <div className={'table-stocks-container'}>
                    <table className={'table-stocks'}>
                        <tbody>
                        {
                            getTableHead(props)
                        }
                        {
                            props.isFiltersVisible ?
                                (
                                    props.filteredStocks.data.length ?
                                        props.filteredStocks.data.map(item => getTableRow(item, props)) :
                                        <tr>
                                            <td colSpan={'8'}>
                                                {'Нет данных'}
                                            </td>
                                        </tr>
                                ) :
                                props.stocks.data.map(item => getTableRow(item, props))
                        }
                        </tbody>
                    </table>
                </div>
        }
    </div>
);

export default HomeView;
