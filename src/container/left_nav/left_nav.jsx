import React, { Component } from 'react'
import { Menu, Icon} from 'antd';
import {Link,withRouter} from 'react-router-dom'
import menus from '../../config/menu-config'
import logo from '../../static/imgs/logo.png'
import './left_nav.less'
const {SubMenu,Item} = Menu;

@withRouter //非路由组件，想用路由组件的API，要经过withRouter的包装
class left_nav extends Component {

	//创建菜单
	createMenu = (menuArr)=>{
		return menuArr.map((menuObj)=>{
			if(!menuObj.children){
				return (
					<Item key={menuObj.key}>
						<Link to={menuObj.path}>
							<Icon type={menuObj.icon}/>
							<span>{menuObj.title}</span>
						</Link>
					</Item>
				)
			}else{
				return (
					<SubMenu
						key={menuObj.key}
						title={
							<span>
								<Icon type={menuObj.icon} />
								<span>{menuObj.title}</span>
							</span>
						}
					>
						{this.createMenu(menuObj.children)}
					</SubMenu>
				)
			}
		})
	}

	render() {
		const {pathname} = this.props.location
		let openKey = pathname.split('/') //数组
		let selectedKey = pathname.split('/').reverse()[0] //字符串
		return (
			<div className="left-nav">
				<div className="nav-top" name="lis">
					<img src={logo} alt="logo"/>
					<h1>商品管理系统</h1>
				</div>
				<div>
					<Menu
						defaultSelectedKeys={[selectedKey]} //默认选中哪个菜单
						defaultOpenKeys={openKey} //默认展开哪个菜单(该菜单有子菜单)
						mode="inline" //菜单范围内展开
						theme="dark" //主题
					>
						{this.createMenu(menus)}
					</Menu>
				</div>
			</div>
		)
	}
}

export default left_nav
