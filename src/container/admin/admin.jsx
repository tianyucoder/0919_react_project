import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

class Admin extends Component {
	render() {
		const {isLogin} = this.props.userInfo
		if(!isLogin) return <Redirect to="/login"/>
		return (
			<h1>
				欢迎登录，{this.props.userInfo.user.username}
			</h1>
		)
	}
}

export default connect(
	(state)=>({userInfo:state.userInfo}), //映射状态
	{} //映射操作状态的方法
)(Admin)
