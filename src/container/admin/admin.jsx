import React, { Component } from 'react'
import check from '../check/check'
import {Layout} from 'antd';
import Header from '../header/header'
import LeftNav from '../left_nav/left_nav'
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
					<Content style={{backgroundColor:'skyblue'}}>Content</Content>
					<Footer>Footer</Footer>
				</Layout>
			</Layout>
		)
	}
}

export default Admin


