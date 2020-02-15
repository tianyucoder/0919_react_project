import React, { Component } from 'react'
import {connect} from 'react-redux'
import {createDeleteUserInfoAction} from '../../redux/actions/login'
import check from '../check/check'

@connect(
	(state)=>({userInfo:state.userInfo}), //映射状态
	{deleteUserInfo:createDeleteUserInfoAction} //映射操作状态的方法
)
@check
class Admin extends Component {

	logout = ()=>{
		this.props.deleteUserInfo()
	}

	render() {
		//const {isLogin} = this.props.userInfo
		//if(!isLogin) return <Redirect to="/login"/>
		return (
			<div>
				欢迎登录，{this.props.userInfo.user.username}
				<button onClick={this.logout}>退出登录</button>
			</div>
		)
	}
}

export default Admin


