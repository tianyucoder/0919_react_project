import React, { Component } from 'react'
import { Card,Button,Icon,Select,Input,Table} from 'antd';
const { Option } = Select;

export default class Product extends Component {
	render() {
		//模拟的表格数据(后期会有真实数据进来)
		const dataSource = [
			{
				_id: '1',
				status:1, //1代表商品上架状态 2代表商品下架
				name: '微波炉',
				desc: '不会爆炸，很好用',
				price: 499,
			},
			{
				_id: '2',
				status:2, //1代表商品上架状态 2代表商品下架
				name: '冰箱',
				desc: '可以装大象',
				price: 899,
			},
		];
		//表格的列设置（重要）
		const columns = [
			{
				title: '商品名称',
				dataIndex: 'name',
				key: 'name',
				width:'20%'
			},
			{
				title: '商品描述',
				dataIndex: 'desc',
				key: 'desc',
			},
			{
				title: '价格',
				align:'center',
				width:'10%',
				dataIndex: 'price',
				key: 'price',
				render:(p)=>'￥'+p
			},
			{
				title: '状态',
				width:'10%',
				dataIndex: 'status',
				key: 'status',
				align:'center',
				render:(status) => {
					return (
						<div>
							<Button type={status === 1 ? 'danger':'primary'}>{status === 1 ? '下架' : '上架'}</Button><br/>
							<span>{status === 1 ? '在售' : '已停售'}</span>
						</div>
					)
				}
			},
			{
				title: '操作',
				width:'10%',
				//dataIndex: 'price',
				align:'center',
				key: 'opera',
				render:()=> {
					return (
						<div>
							<Button type="link">详情</Button><br/>
							<Button type="link">修改</Button>
						</div>
					)
				}
			},
		];
		return (
			<Card 
				title={
					<div>
						<Select value="productName">
							<Option value="productName">按名称搜索</Option>
							<Option value="productDesc">按描述搜索</Option>
						</Select>
						<Input allowClear style={{width:'20%',margin:'0 10px'}} placeholder="请输入关键字"/>
						<Button type="primary"><Icon type="search" />搜索</Button>
					</div>
				} 
				extra={<Button type="primary"><Icon type="plus-circle"/>添加商品</Button>}
			>
				<Table 
					dataSource={dataSource} //配置表格数据
					columns={columns} //配置表格的列（重要）
					bordered
				/>
			</Card>
		)
	}
}
