import React, { Component } from 'react'
import check from '../check/check'
import {Switch,Route,Redirect} from 'react-router-dom'
import {Layout} from 'antd';
import Header from '../header/header'
import LeftNav from '../left_nav/left_nav'
import Home from '../../components/home/home'
import Bar from '../../components/bar/bar'
import Line from '../../components/line/line'
import Pie from '../../components/pie/pie'
import Category from '../category/category'
import Product from '../product/product'
import Role from '../role/role'
import User from '../user/user'
import './admin.less'

const {Footer,Sider,Content} = Layout;

@check
class Admin extends Component {
	render() {
		return (
			<Layout className="layout">
				<Sider>
					<LeftNav/>
				</Sider>
				<Layout>
					<Header/>
					<Content className="content">
						<Switch>
							<Route path="/admin/home" component={Home}/>
							<Route path="/admin/prod_about/category" component={Category}/>
							<Route path="/admin/prod_about/product" component={Product}/>
							<Route path="/admin/user" component={User}/>
							<Route path="/admin/role" component={Role}/>
							<Route path="/admin/charts/bar" component={Bar}/>
							<Route path="/admin/charts/line" component={Line}/>
							<Route path="/admin/charts/pie" component={Pie}/>
							<Redirect to="/admin/home"/>
						</Switch>
					</Content>
					<Footer className="footer">
					推荐使用谷歌浏览器，获取最佳用户体验
					</Footer>
				</Layout>
			</Layout>
		)
	}
}

export default Admin


