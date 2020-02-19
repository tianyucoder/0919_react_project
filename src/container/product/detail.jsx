import React, { Component } from 'react'
import { Card,Button,Icon,List,message} from 'antd';
import {connect} from 'react-redux'
import {createGetCategoryAsyncAction} from '../../redux/actions/category'
import {reqProductById} from '../../api'
import {BASE_URL} from '../../config'
import './detail.less'
const {Item} = List

@connect(
	(state)=>({categoryList:state.categoryList}),//映射状态
	{getCategory:createGetCategoryAsyncAction}//映射操作状态的方法
)
class Detail extends Component {

	state = {
		productInfo:{
			imgs:[],
			name: "",
			desc: "",
			price:0,
			categoryId: "",
			detail: ""
		}
	}

	//根据分类id获取分类名称
	getCategoryName = (id)=>{
		let result = this.props.categoryList.find((categoryObj)=>{
			return id === categoryObj._id
		})
		if(result) return result.name
	}

	//通过id获取商品详细信息
	getProductById = async(id)=>{
		//发起请求获取商品id
		let result = await reqProductById(id)
		const {status,data,msg} = result
		if(status === 0){
			console.log(data);
			this.setState({productInfo:data})
		}else{
			message.error(msg)
		}
	}

	componentDidMount(){
		//1.获取商品id
		const {id} = this.props.match.params
		//2.请求详细信息
		this.getProductById(id)
		//3.尝试从redux中读取分类列表
		if(!this.props.categoryList.length){
			this.props.getCategory()
		}
	}

	render() {
		const {name,desc,price,imgs,categoryId,detail} = this.state.productInfo
		return (
			<Card 
				title={
						<div>
							<Button type="link" onClick={this.props.history.goBack}>
								<Icon type="arrow-left" style={{fontSize:'20px'}}/>
							</Button>
							<span>商品详情</span>
						</div>
			}>
				<List>
					<Item className="list-item">
						<span className="title">商品名称：</span>
						<span className="content">{name}</span>
					</Item>
					<Item className="list-item">
						<span className="title">商品描述：</span>
						<span className="content">{desc}</span>
					</Item>
					<Item className="list-item">
						<span className="title">商品价格：</span>
						<span className="content">{price}</span>
					</Item>
					<Item className="list-item">
						<span className="title">所属分类：</span>
						<span className="content">{this.getCategoryName(categoryId)}</span>
					</Item>
					<Item className="list-item">
						<span className="title">商品图片：</span>
						<span className="content">{
							imgs.map((imgName)=>{
								return <img key={imgName} src={BASE_URL+'/upload/'+imgName}/>
							})
						}</span>
					</Item>
					<Item className="list-item">
						<span className="title">商品详情：</span>
						<span className="content" dangerouslySetInnerHTML={{__html:detail}}></span>
					</Item>
				</List>
			</Card>
		)
	}
}
export default Detail