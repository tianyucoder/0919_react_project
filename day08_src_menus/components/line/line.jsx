import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react';

export default class Line extends Component {

	getOption = ()=>{
		return {
			title: {
					text: '折线图'
			},
			tooltip: {},
			legend: {
					data:['销量','库存']
			},
			xAxis: {
					data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
			},
			yAxis: {},
			series: [{
					name: '销量',
					type: 'line',
					data: [5, 20, 36, 10, 10, 20]
			},
			{
					name: '库存',
					type: 'line',
					data: [150, 2, 200, 100, 100, 200]
			}]
	};
	}

	render() {
		return (
			<div>
			
			<ReactEcharts option={this.getOption()} />
			</div>
		)
	}
}
