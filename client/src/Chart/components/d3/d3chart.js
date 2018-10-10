import React from 'react';
import * as d3 from 'd3';

class D3chart extends React.Component {
    componentDidUpdate(prevProps) {
        if (prevProps.stockHistoryData === this.props.stockHistoryData) {
            return;
        }

        const data = this.props.stockHistoryData;

        const svg = d3.select('svg');
        const margin = {top: 20, right: 20, bottom: 30, left: 50};
        const width = +svg.attr('width') - margin.left - margin.right;
        const height = +svg.attr('height') - margin.top - margin.bottom;
        const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

        const x = d3.scaleTime()
            .rangeRound([0, width]);

        const y = d3.scaleLinear()
            .rangeRound([height, 0]);

        let counter;
        const line = d3.line()
            .x((d, i) => {
                if (data[i].value) {
                    return x(new Date(d.date));
                } else {
                    return x(new Date(data[counter ? counter : 0].date));
                }
            })
            .y((d, i) => {
                if (d.value) {
                    counter = i;
                    return y(d.value);
                } else {
                    return y(data[counter ? counter : 0].value);
                }
            });

        x.domain(d3.extent(data, (d) => new Date(d.date)));
        y.domain(d3.extent(data, (d) => d.value));

        g.append('g')
            .attr('transform', 'translate(0,' + height + ')')
            .call(d3.axisBottom(x))
            .select('.domain');

        g.append('g')
            .call(d3.axisLeft(y))
            .append('text')
            .attr('fill', '#000')
            .attr('transform', 'rotate(-90)')
            .attr('y', 6)
            .attr('dy', '0.71em')
            .attr('text-anchor', 'end')
            .text('Цена (р)');

        g.append('path')
            .datum(data)
            .attr('fill', 'none')
            .attr('stroke', 'steelblue')
            .attr('stroke-linejoin', 'round')
            .attr('stroke-linecap', 'round')
            .attr('stroke-width', 1.5)
            .attr('d', line);
    }

    render() {
        return (
            <div className='d3chart-wrapper'>
                <svg width='600' height='360' />
            </div>
        );
    }
}

export default D3chart;
