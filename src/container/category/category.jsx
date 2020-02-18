import React, { Component } from 'react'
import {connect} from 'react-redux'
import {createGetCategoryAsyncAction} from '../../redux/actions/category'
import {Card,Button,Icon,Table,Modal,Input,Form,message} from 'antd';
import {PAGE_SIZE} from '../../config'
import {reqAddCategory} from '../../api'
const {Item} = Form

@connect(
	(state)=>({categoryList:state.categoryList}),//映射状态
	{getCategory:createGetCategoryAsyncAction}//映射操作状态的方法
)
@Form.create()
class Category extends Component {

	state = {
		visible:false //是否展示弹窗
	};

	componentDidMount(){
		this.props.getCategory() //此行代码功能是：获取商品分类数据
	}

	//用于展示弹窗
  showModal = () => {
    this.setState({visible: true}); //展示弹窗
  };

	//确定按钮的回调
  handleOk = () => {
		this.props.form.validateFields(async(err,values) => {
			if(!err){
				let result = await reqAddCategory(values.categoryName)
				const {status,data,msg} = result
				if(status === 0){
					message.success('添加商品成功')
					this.props.getCategory() //重新获取所有分类数据
					this.props.form.resetFields()//重置表单
					this.setState({visible: false}); //隐藏弹窗
				}else{
					message.error(msg)
				}
			}
    });
  };

	//取消按钮的回调
  handleCancel = () => {
		this.props.form.resetFields()//重置表单
    this.setState({visible: false}); //隐藏弹窗
  };
	
	render() {
		const {getFieldDecorator} = this.props.form;
		//表格列的设置(重要配置，可以设置列的宽、展示什么信息等)
		const columns = [
			{
				title: '分类名', //列名字
				dataIndex: 'name', //列要展示的数据（必须在真实数据中存在）
				key: 'name',//当前列的标识，名称随意，唯一即可
				width:"75%"
			},
			{
				title: '操作',
				//dataIndex: 'a',
				key: 'age',
				width:"25%",
				align:'center',
				//当前列如果不是单纯的展示数据，而是展示一些按钮、超链接等结构性的东西，要写render属性
				//render属性的值是一个函数，该函数返回的“东西”展示在该条数据中
				render:()=> <Button type="link">修改分类</Button> 
			}
		];
		return (
			<div>
				{/* Card组件用于搭建分类管理整体结构 */}
				<Card 
					extra={
						<Button type="primary" onClick={this.showModal}>
							<Icon type="plus-circle"/>添加
						</Button>
					}
				>
					<Table 
						dataSource={this.props.categoryList} //表格数据
						columns={columns} //表格列的信息(重要)
						bordered //表格展示边框
						pagination={{pageSize:PAGE_SIZE}}//分页器，用于配置：每页展示多少条等信息
						rowKey="_id"//每条数据都应该有一个唯一标识，antd默认找的标识是key，如果不想用key，那么在此指定
					/>
				</Card>
				{/* 新增分类、修改分类弹窗（复用弹窗） */}
				<Modal
          title="添加分类" //弹窗的标题
          visible={this.state.visible} //控制弹窗是否显示
          onOk={this.handleOk}//确定按钮的回调
					onCancel={this.handleCancel}//取消按钮的回调
					okText="确定" //确认按钮的文字
					cancelText="取消"//取消按钮的文字
        >
          <Form className="login-form">
						<Item>
							{getFieldDecorator('categoryName', {
									rules: [{required: true, message: '分类名必须输入'}]
								})(<Input placeholder="请输入分类名"/>)
							}
						</Item>
					</Form>
        </Modal>
			</div>
		)
	}
}

export default Category
