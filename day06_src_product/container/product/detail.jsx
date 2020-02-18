import React, { Component } from 'react'

export default class Detail extends Component {
	render() {
		return (
			<div>
				商品详情页面，以后展示商品的详细信息，只是展示，不能修改
				<button onClick={()=>{this.props.history.goBack()}}>返回</button>
			</div>
		)
	}
}
