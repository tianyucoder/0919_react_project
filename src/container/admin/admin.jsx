import React, { Component } from 'react'
import {connect} from 'react-redux'

class Admin extends Component {
	render() {
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
