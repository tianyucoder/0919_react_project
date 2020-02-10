import React, { Component } from 'react'
import {Form,Icon,Input,Button,Checkbox } from 'antd';
import logo from './img/logo.png'
import './css/login.less'
const {Item} = Form

class Login extends Component {
	render() {
		const { getFieldDecorator } = this.props.form;
		//console.log(this.props);
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
							<Input
								prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
								type="password"
								placeholder="密码"
							/>
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

//Form.create()返回值依是一个函数，该函数接收一个组件，随后生成一个新组件，我们渲染那个新组件
//Form.create()返回的方法能够加工组件，生成的新组件多了一个特别重要的属性：form
export default Form.create()(Login);



