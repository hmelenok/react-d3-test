import React from 'react';
import * as d3 from 'd3';
import {generateArray} from '../../data-layer/array-processors';
import {size} from 'lodash';

export default class HorizontalBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: generateArray().map(({val}) => val)
      // data: [1, 5, 100]
      // data: [5, 100, 300, 1000]
    };
  }

  componentDidMount() {
    this.buildTable();
  }

  buildTable() {
    const chart = d3.select(this.chart);
    const scale = d3
      .scaleLinear()
      .domain([0, d3.max(this.state.data)])
      .range([0, window.innerWidth - 100]);
    const p = chart.selectAll('div').data(this.state.data);
    const axis = d3.axisBottom(scale);
    chart
      .append('svg')
      .attr('height', 20)
      .attr('width', window.innerWidth - 100)
      .attr('class', 'x axis')
      .call(axis);
    p
      .enter()
      .append('div')
      .attr('class', 'HorizontalBar__item')
      .transition()
      .duration(1000)
      .style('width', d => scale(d) + 'px')
      .style('height', '20px')
      .style('margin', '10px 0')
      .style('background-color', '#0a83cf');

    p.exit().remove();
  }

  render() {
    return <div className={'HorizontalBar'} ref={r => (this.chart = r)} />;
  }
}
