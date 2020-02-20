import React, { Component } from 'react'
import {Form,Icon,Input,Button,message} from 'antd';
import logo from '../../static/imgs/logo.png'
import './css/login.less'
import {reqLogin} from '../../api'
import {connect} from 'react-redux'
import {createSaveUserInfoAction} from '../../redux/actions/login'
import check from '../check/check'
const {Item} = Form

@connect(
	(state)=>({userInfo:state.userInfo}),//用于映射状态
	{saveUserInfo:createSaveUserInfoAction} //用于映射操作状态的方法
)
@Form.create()
@check
class Login extends Component {

	//自定义密码校验器
	passwordValidator = (rule, value, callback)=>{
		/* 
			用户名/密码的的合法性要求
				1). 必须输入
				2). 必须大于等于4位
				3). 必须小于等于12位
				4). 必须是英文、数字或下划线组成
		*/
		/* 1. value是用户的输入
			 2.callback何时调用？(1).当用户输入的东西不合法的时候
		 */
		if(!value){
			callback('密码必须输入')
		}else if(value.length > 12){
			callback('密码必须小于等于12位')
		}else if(value.length < 4){
			callback('密码必须大于等于4位')
		}else if(!(/^\w+$/).test(value)){
			callback('密码必须是英文、数字或下划线组成')
		}else{
			callback()
		}
	}

	//响应表单提交
	handleSubmit = (event)=>{
		event.preventDefault() //阻止表单提交这个默认行为
		//获取所有表单中用户的输入
		this.props.form.validateFields(async(err, values) => {
			//如果输入的用户名和密码均没问题，就发送请求
      if (!err) {
				const {username,password} = values
				let result = await reqLogin(username,password)
				const {status,data,msg} = result
				if(status === 0){
					message.success('登录成功！')
					//向redux中保存用户信息
					this.props.saveUserInfo(data)
					//跳转到admin页面
					this.props.history.replace('/admin')
				}else{
					message.warning(msg)
				}
      }
    });

	}

	render() {
		const {getFieldDecorator} = this.props.form;
		//const {isLogin} = this.props.userInfo
		//if(isLogin) return <Redirect to="/admin"/>
		return (
			<div id="login">
				<div className="header">
					<img src={logo} alt="logo"/>
					<h1>商品管理系统</h1>
				</div>
				<div className="content">
					<h1>用户登录</h1>
					<Form onSubmit={this.handleSubmit} className="login-form">
						<Item>
							{/* 
								用户名/密码的的合法性要求
									1). 必须输入
									2). 必须大于等于4位
									3). 必须小于等于12位
									4). 必须是英文、数字或下划线组成
							*/}
							{/* getFieldDecorator('给要装饰的域起个名字',{rules:[{规则1},{{规则2}}]})(要装饰的内容) */}
							{
								getFieldDecorator('username', {
									rules: [
										{required: true, message: '用户名必须输入'},
										{max:12,message: '用户名必须小于等于12位'},
										{min:4,message: '用户名必须大于等于4位'},
										{pattern:/^\w+$/,message: '用户名必须是英文、数字或下划线组成'}
									]
								})(
									<Input
										prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
										placeholder="用户名"
									/>,
								)
							}
						</Item>
						<Item>
							{
								getFieldDecorator('password',{
									rules:[
										{validator:this.passwordValidator}
									]
								})(
									<Input
										prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
										type="password"
										placeholder="密码"
									/>
								)
							}
						</Item>
						<Item>
							<Button type="primary" htmlType="submit" className="login-form-button">
								登录
							</Button>
						</Item>
					</Form>
				</div>
			</div>
		)
	}
}

export default Login

