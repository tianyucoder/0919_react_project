import React, { Component } from 'react'
import { Card,Button,Icon,Select,Input,Table} from 'antd';
import {reqProductList} from '../../api'
import {PAGE_SIZE} from '../../config'
const { Option } = Select;

export default class Product extends Component {

	state = {
		productList:[]
	}

	getProductList = async(pageNumber=1)=>{
		let result = await reqProductList(pageNumber,PAGE_SIZE)
		const {status,data,msg} = result
		if(status===0){
			this.setState({productList:data.list})
		}
	}

	componentDidMount(){
		this.getProductList()
	}

	render() {
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
					dataSource={this.state.productList} //配置表格数据
					columns={columns} //配置表格的列（重要）
					bordered
					rowKey='_id'
				/>
			</Card>
		)
	}
}
