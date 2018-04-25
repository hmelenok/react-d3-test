import React from 'react';
import * as d3 from 'd3';
import {generateArray} from '../../data-layer/array-processors';
import {size} from 'lodash';
import './index.scss';

export default class HorizontalBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: generateArray()
    };
  }

  componentDidMount() {
    this.buildTable();
  }

  buildTable() {
    const chart = d3.select(this.chart);
    const numbers = this.state.data.map(({val}) => val);
    const scale = d3
      .scaleLinear()
      .domain([0, d3.max(numbers)])
      .range([0, window.innerWidth - 100]);
    const p = chart
      .selectAll('div')
      .data(numbers)
      .attr('data-label', (d, index) => this.state.data[index].label);
    this.renderAxis(chart, scale);
    p
      .enter()
      .append('div')
      .attr('class', 'HorizontalBar__item')
      .transition()
      .duration(1000)
      .style('width', d => scale(d) + 'px')
      .style('height', '20px')
      .style('margin', '10px 0')
      .style('background-color', '#0a83cf')
      .attr('data-label', (d, index) => this.state.data[index].label);

    p.exit().remove();
  }

  renderAxis(chart, scale) {
    const axis = d3
      .axisBottom(scale)
      .scale(scale)
      .tickSizeOuter(0)
      .tickSizeInner(0);
    chart
      .append('svg')
      .attr('height', 20)
      .attr('width', window.innerWidth - 80)
      .attr('class', 'HorizontalBar__axis')
      .call(axis);
    chart.selectAll('.HorizontalBar__axis .domain').attr('stroke', 'transparent');
    chart
      .selectAll('.HorizontalBar__axis .tick text')
      .style('transform', 'translate(3px, 0)')
      .attr('fill', '#939393')
      .style('font-size', '14px)');
  }

  render() {
    return <div className={'HorizontalBar'} ref={r => (this.chart = r)} />;
  }
}
