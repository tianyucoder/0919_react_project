import React, { Component } from 'react'
import logo from './img/logo.png'
import './css/login.less'

export default class Login extends Component {
	render() {
		return (
			<div id="login">
				<div className="header">
					<img src={logo} alt="logo"/>
					<h1>商品管理系统</h1>
				</div>
				<div className="content">
					<h1>用户登录</h1>
					<div>这里以后会放antd的表单</div>
				</div>
			</div>
		)
	}
}
