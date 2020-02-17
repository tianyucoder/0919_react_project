import React, { Component } from 'react'
import {Card,Button,Icon,Table} from 'antd';

export default class Category extends Component {
	render() {
		//数据
		const dataSource = [
			{
				key: '1',
				name: '测试分类一',
			},
			{
				key: '2',
				name: '测试分类二',
			},
			{
				key: '3',
				name: '测试分类三',
			},
		];
		//列
		const columns = [
			{
				title: '分类名',
				dataIndex: 'name',
				key: 'name',
				width:"75%"
			},
			{
				title: '操作',
				//dataIndex: 'a',
				key: 'age',
				width:"25%",
				align:'center',
				render:()=> <Button type="link">修改分类</Button>
			}
		];
		return (
			<Card 
				extra={<Button type="primary"><Icon type="plus-circle"/>添加</Button>}
			>
				<Table 
					dataSource={dataSource} 
					columns={columns} 
					bordered
				/>
			</Card>
		)
	}
}
