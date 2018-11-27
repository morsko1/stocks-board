import React from 'react';
import './index.scss';
import * as util from '~/common/util';
import Layout from '~/common/components/Layout/Layout.js';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faAngleDoubleUp,
    faAngleDoubleDown,
    faArrowUp,
    faArrowDown
} from '@fortawesome/free-solid-svg-icons';
import StocksTable from '~/common/components/StocksTable';

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
                                <td className={'all-stocks__filters-table-td-label'}>Кап-ция, млрд р:</td>
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
                    <div className={'all-stocks__filters-buttons'}>
                        <button
                            type={'submit'}
                            className={'all-stocks__button-apply-filters'}
                        >
                            {'применить'}
                        </button>
                        <button
                            className={'all-stocks__button-reset-filters'}
                            onClick={(event) => {
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
                фильтры <FontAwesomeIcon icon={props.isFiltersVisible ? faArrowUp : faArrowDown} />
            </button>
        </div>
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

const getStocksView = (props) => {
    return (
        <div className={'all-stocks'}>
        {
            getFiltersButton(props)
        }
        {
            getFiltersView(props)
        }
            <StocksTable
                stocks={props.isFiltersVisible ? props.filteredStocks : props.stocks}
                sort={props.sort}
                sortRowsBy={props.sortRowsBy}
                numberRowsToShow={props.numberRowsToShow}
                goToStockPage={props.goToStockPage}
            />
        {
            props.filteredStocks.data.length > 30 ?
                getTableControls(props) :
                null
        }
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
            (
                !props.stocksFetchingError ?
                     getStocksView(props) :
                    <div className={'all-stocks__no-data'}>{'Нет данных'}</div>
            )
        }
        </Layout>
    );
}

export default FullTableView;
