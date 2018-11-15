import React from 'react';
import './style.scss';
import MediaQuery from 'react-responsive';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faSearch,
    faTimes
} from '@fortawesome/free-solid-svg-icons';


const getSearchForm = (props) => {
    return (
        <form
            autoComplete="off"
            className="search-stocks__search-form"
            onSubmit={(e) => e.preventDefault()}
        >
            <input
                type="text"
                id="search-stocks__search-input"
                className="search-stocks__search-input"
                value={props.searchInput}
                onChange={(e) => {props.searchStocks(e.target.value)}}
            />
            {
                props.searchInput.length ?
                    <FontAwesomeIcon
                        icon={faTimes}
                        className="search-stocks__search-icon"
                        onClick={() => {props.resetInput()}}
                    /> :
                    <FontAwesomeIcon
                        className="search-stocks__search-icon"
                        icon={faSearch}
                        onClick={() => {
                            if (props.isSearchVisible) {
                                props.resetInput();
                                props.hideSearch();
                            }
                        }}
                    />
            }
        </form>
    );
}

const getSearchResultList = (props) => {
    return (
        <div className="search-stocks__search-result">
        {
            props.foundStocks.length ?
                props.foundStocks.map(stock => {
                    return (
                        <div
                            key={stock.ticker}
                            className="search-stocks__search-result-item"
                            onClick={() => {
                                props.resetInput();
                                props.hideSearch();
                                props.goToStockPage(stock.ticker);
                            }}
                        >
                            {`${stock.shortName} (${stock.ticker})`}
                        </div>
                    );
                }) :
                <div className="search-stocks__search-result-item">Нет данных</div>
        }
        </div>
    );
}

const getSearchView = (props) => {
    return (
        <div className={'search-stocks__search-container'}>
            {getSearchForm(props)}
            {
                props.searchInput.length ?
                    getSearchResultList(props) :
                    null
            }
        </div>
    );
}

const getSearchViewMobile = (props) => {
    return (
        <div className="search-stocks-mobile__right">
        {
            props.isSearchVisible ?
                getSearchView(props) :
                <div className="search-stocks-mobile__search-icon-container">
                    <FontAwesomeIcon
                        icon={faSearch}
                        className="search-stocks-mobile__search-icon"
                        onClick={() => {
                            props.showSearch();
                            setTimeout(() => {
                                document.getElementById('search-stocks__search-input').focus();
                            }, 0);
                        }}
                    />
                </div>
        }
        </div>
    );
}

const SearchStocksView = props => {
    return (
        <div className="search-stocks__inline-block">
            <MediaQuery maxWidth={767}>
                {getSearchViewMobile(props)}
            </MediaQuery>
            <MediaQuery minWidth={768}>
                {getSearchView(props)}
            </MediaQuery>
        </div>
    );
}

export default SearchStocksView;
