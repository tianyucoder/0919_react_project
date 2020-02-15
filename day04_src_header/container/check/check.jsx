//check组件是一个高阶组件:1.接收一个组件。2.返回一个新组件
//check组件能够对传入的组件，进行权限检查：
//例如：未登录，不能看admin; 登录了，不能看login
import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

export default function (ReceiveComponent){
	@connect(
		(state)=>({isLogin:state.userInfo.isLogin}),//映射状态
		{} //映射操作状态的方法
	)
	class NewComponent extends Component{
		/* 
			check检查的规则:
				1.用户如果没登录，用户还想看admin页面，不能让看，跳转到login，让用户登录
				2.用户如果登录了，用户还想看login页面，不能让看，跳转到admin
		*/
		render(){
			const {isLogin} = this.props
			const {pathname} = this.props.location
			if(!isLogin && pathname === '/admin') return <Redirect to="/login"/>
			if(isLogin && pathname === '/login') return <Redirect to="/admin"/>
			return <ReceiveComponent {...this.props}/>
		}
	}
	return NewComponent
}

