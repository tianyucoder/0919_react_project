import React, { Component } from 'react'
import {Form,Icon,Input,Button} from 'antd';
import axios from 'axios'
import logo from './img/logo.png'
import './css/login.less'
const {Item} = Form

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
		this.props.form.validateFields((err, values) => {
      if (!err) {
				const {username,password} = values
				//如果输入的用户名和密码均没问题，就发送请求
				//console.log('发送了网络请求', values);
				axios.post('http://localhost:3000/login',`username=${username}&password=${password}`).then(
					(response)=>{console.log(response.data);},
					(error)=>{console.log(error);}
				)
      }
    });

	}

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

//Form.create()返回值依是一个函数，该函数接收一个组件，随后生成一个新组件，我们渲染那个新组件
//Form.create()返回的方法能够加工组件，生成的新组件多了一个特别重要的属性：form
export default Form.create()(Login);

/*
  总结：
    1. 高阶函数
      定义: 如果函数接收的参数是函数或者返回值是函数
      例子: Promise() / then() / 定时器 / 数组遍历相关方法 / bind() / $() / $.get() / Form.create()
			好处: 更加动态, 更加具有扩展性

		2. 高阶组件 备注：组件的本质是函数！！！
			定义: 接收一个组件且返回一个新组件
			例子: Form.create()(组件) / withRouter(组件) / connect()(组件)
			高阶组件与高阶函数的关系?
					高阶组件是一个特别的高阶函数
					接收的是组件, 同时返回新的组件
			作用:
					React 中用于复用组件逻辑的一种高级技巧
*/



