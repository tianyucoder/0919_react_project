import React, { Component } from 'react'
import { Menu, Icon} from 'antd';
import menus from '../../config/menu-config'
import logo from '../../static/imgs/logo.png'
import './left_nav.less'
const {SubMenu,Item} = Menu;

export default class left_nav extends Component {

	//创建菜单
	createMenu = (menuArr)=>{
		return menuArr.map((menuObj)=>{
			if(!menuObj.children){
				return (
					<Item key={menuObj.key}>
						<Icon type={menuObj.icon} />
						<span>{menuObj.title}</span>
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
		return (
			<div className="left-nav">
				<div className="nav-top" name="lis">
					<img src={logo} alt="logo"/>
					<h1>商品管理系统</h1>
				</div>
				<div>
					<Menu
						defaultSelectedKeys={[]} //默认选中哪个菜单
						defaultOpenKeys={[]} //默认展开哪个菜单(该菜单有子菜单)
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
