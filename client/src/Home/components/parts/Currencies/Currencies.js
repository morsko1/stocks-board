import React from 'react';
import './Currencies.scss';

const currenciesToShow = ['USD/RUB', 'EUR/RUB'];

const renderFilteredCurrencies = (currencies) => {
    const data = currencies.data.filter(item => {
        return currenciesToShow.includes(item.name);
    });
    return data.map(item => {
        return (
            <div
                key={item.name}
                className={'currencies__currency-item'}>
                    {`${item.name} ${Math.round(item.value * 100) / 100}`}
            </div>
        );
    })
}

const CurrenciesView = props => {
    return (
        <div className={'currencies'}>
            <div className={'currencies__inner'}>
                {
                    props.currencies.data.length ?
                        renderFilteredCurrencies(props.currencies) :
                        null
                }
            </div>
        </div>
    );
}

export default CurrenciesView;
