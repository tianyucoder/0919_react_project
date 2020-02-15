import React, { Component } from 'react'
import './header.less'

export default class Header extends Component {
	render() {
		return (
			<div className="header">
				<div className="header-top">
					<span>欢迎xxxx</span>
				</div>
				<div className="header-bottom">
					<div className="bottom-left"></div>
					<div className="bottom-right"></div>
				</div>
			</div>
		)
	}
}
