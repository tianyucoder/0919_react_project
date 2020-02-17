import React, { Component } from 'react'
import {connect} from 'react-redux'
import {createGetCategoryAsyncAction} from '../../redux/actions/category'
import {Card,Button,Icon,Table,Modal,Input,Form} from 'antd';
import {PAGE_SIZE} from '../../config'

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
		//分发一个获取商品分类信息的action
		this.props.getCategory()
	}

	//用于展示弹窗
  showModal = () => {
    this.setState({visible: true}); //展示弹窗
  };

	//确定按钮的回调
  handleOk = () => {
		this.props.form.validateFields((err,values) => {
			if(!err){
				console.log(values);
			}
    });
    this.setState({visible: false}); //隐藏弹窗
  };

	//取消按钮的回调
  handleCancel = () => {
    this.setState({visible: false}); //隐藏弹窗
  };
	
	render() {
		const {getFieldDecorator} = this.props.form;
		//表格列的设置(重要配置，可以设置列的宽、展示什么信息等)
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
			<div>
				<Card 
					extra={
						<Button type="primary" onClick={this.showModal}>
							<Icon type="plus-circle"/>添加
						</Button>
					}
				>
					<Table 
						dataSource={this.props.categoryList} //表格数据
						columns={columns} //表格列的信息
						bordered //表格展示边框
						pagination={{pageSize:PAGE_SIZE}}
						rowKey="_id"
					/>
				</Card>
				{/* 新增分类、修改分类弹窗（复用弹窗） */}
				<Modal
          title="添加分类" //
          visible={this.state.visible} //控制弹窗是否显示
          onOk={this.handleOk}//确定按钮的回调
					onCancel={this.handleCancel}//取消按钮的回调
					okText="确定"
					cancelText="取消"
        >
          <Form onSubmit={this.handleSubmit} className="login-form">
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
