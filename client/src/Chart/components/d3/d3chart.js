import React from 'react';
import * as d3 from 'd3';
import MediaQuery from 'react-responsive';

class D3chart extends React.Component {
    componentDidMount(prevProps) {

        d3.timeFormatDefaultLocale({
          'decimal': '.',
          'thousands': ',',
          'grouping': [3],
          'currency': ['$', ''],
          'dateTime': '%a %b %e %X %Y',
          'date': '%d/%m/%Y',
          'time': '%H:%M:%S',
          'periods': ['AM', 'PM'],
          'days': ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
          'shortDays': ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
          'months': ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
          'shortMonths': ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
          week : {
              dow : 1,
              doy : 4
          }
        });

        const data = this.props.stockHistoryData;

        const svg = d3.select('svg#d3chart');
        const margin = {top: 20, right: 20, bottom: 50, left: 50};
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
            })
            .curve(d3.curveMonotoneX);

        x.domain(d3.extent(data, (d) => new Date(d.date)));
        y.domain(d3.extent(data, (d) => d.value));

        g.append('g')
            .attr('transform', 'translate(0,' + height + ')')
            .call(d3.axisBottom(x)
                .ticks(d3.timeMonth.every(1)))
            .selectAll('text') 
            .style('text-anchor', 'end')
            .attr('dx', '-.8em')
            .attr('dy', '.15em')
            .attr('transform', 'rotate(-55)');

        g.append('g')
            .call(d3.axisLeft(y)
                .ticks(5))
            .append('text')
            .attr('fill', '#000')
            .attr('transform', 'rotate(-90)')
            .attr('y', 6)
            .attr('dy', '0.71em')
            .attr('text-anchor', 'end');

        g.append('path')
            .datum(data)
            .attr('fill', 'none')
            .attr('stroke', 'steelblue')
            .attr('stroke-linejoin', 'round')
            .attr('stroke-linecap', 'round')
            .attr('stroke-width', 2)
            .attr('d', line);
    }

    render() {
        return (
            <div>
                <MediaQuery minWidth={768}>
                    <div className="d3chart">
                        <svg id="d3chart" width="768" height="460" />
                    </div>
                </MediaQuery>
                <MediaQuery maxWidth={767}>
                    <div className="d3chart">
                        <svg id="d3chart" width="360" height="216" />
                    </div>
                </MediaQuery>
            </div>
        );
    }
}

export default D3chart;
