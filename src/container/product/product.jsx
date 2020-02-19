import React, { Component } from 'react'
import { Card,Button,Icon,Select,Input,Table, message} from 'antd';
import {reqProductList,reqSearchProductList,reqUpdateProductStatus} from '../../api'
import {PAGE_SIZE} from '../../config'
const { Option } = Select;

export default class Product extends Component {

	state = {
		productList:[],//商品列表
		total:0 ,//商品总数
		searchType:'productName',//搜索类型
		keyWord:''//搜索的关键词
	}

	//对商品进行上架、下架
	changeStatus = async(productObj)=>{
		//1.如果原来状态为1，那么改为2，反之亦然
		let {_id} = productObj //获取当前商品的_id
		let _status = productObj.status //获取当前商品的状态
		if(_status === 1) _status = 2 //更改状态（取反）
		else _status = 1
		//2.发送请求更新商品
		let result = await reqUpdateProductStatus(_id,_status)
		const {status,msg} = result //解析回来的数据
		if(status === 0){
			//如果成功
			message.success('操作成功')
			//刷新商品列表
			this.getProductList()
		}else{
			message.error(msg)
		}

	}

	//初始化商品列表、搜索商品列表
	getProductList = async(pageNumber=1)=>{
		let result //提前定义好一个变量接收服务器返回的数据
		if(this.isSearch){
			//如果是搜索查询
			const {searchType,keyWord} = this.state
			result = await reqSearchProductList(searchType,keyWord,pageNumber,PAGE_SIZE)
		}else{
			//如果是初始化查询
			result = await reqProductList(pageNumber,PAGE_SIZE)
		}
		const {status,data,msg} = result
		if(status===0){ //若获取数据成功
			const {list,total} = data
			this.setState({productList:list,total}) //更新状态
		}else{
			message.error(msg)
		}
	}

	componentDidMount(){
		//一上来就请求第一页商品信息
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
				width:'13%',
				//dataIndex: 'status',
				key: 'status',
				align:'center',
				render:(productObj) => {
					return (
						<div>
							<Button 
								onClick={()=>{this.changeStatus(productObj)}} 
								type={productObj.status === 1 ? 'danger':'primary'}
							>{productObj.status === 1 ? '下架' : '上架'}
							</Button><br/>
							<span>{productObj.status === 1 ? '当前状态：在售' : '当前状态：已停售'}</span>
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
				render:(porductObj)=> {
					return (
						<div>
							<Button 
								type="link" 
								onClick={()=>{this.props.history.push(`/admin/prod_about/product/detail/${porductObj._id}`)}}
							>详情
							</Button>
							<br/>
							<Button 
								type="link"
								onClick={()=>{this.props.history.push(`/admin/prod_about/product/add_update/${porductObj._id}`)}}
							>修改
							</Button>
						</div>
					)
				}
			},
		];
		return (
			<Card 
				title={
					<div>
						<Select value={this.state.searchType} onChange={(value)=>{this.setState({searchType:value})}}>
							<Option value="productName">按名称搜索</Option>
							<Option value="productDesc">按描述搜索</Option>
						</Select>
						<Input 
							allowClear style={{width:'20%',margin:'0 10px'}} 
							placeholder="请输入关键字"
							onChange={(event)=>{this.setState({keyWord:event.target.value})}}
						/>
						<Button type="primary" onClick={()=>{this.isSearch=true;this.getProductList()}}><Icon type="search" />搜索</Button>
					</div>
				} 
				extra={<Button type="primary" onClick={()=>{this.props.history.push('/admin/prod_about/product/add_update')}}><Icon type="plus-circle"/>添加商品</Button>}
			>
				<Table 
					dataSource={this.state.productList} //配置表格数据
					columns={columns} //配置表格的列（重要）
					bordered
					rowKey='_id'
					pagination={{
						total:this.state.total, //服务器端一共有多少条数据
						pageSize:PAGE_SIZE, //每页展示数据的条数
						onChange:(number)=>{this.getProductList(number)} //用户所点击的页码发生变化时调用
					}}
				/>
			</Card>
		)
	}
}
