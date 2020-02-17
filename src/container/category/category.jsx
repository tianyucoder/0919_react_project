import React, { Component } from 'react'
import {Card,Button,Icon,Table,Modal,Input,Form} from 'antd';
import {reqCategory} from '../../api'

const {Item} = Form

@Form.create()
class Category extends Component {

	state = { visible: false };

	async componentDidMount(){
		let result = await reqCategory()
		console.log(result);
	}

	//用于展示弹窗
  showModal = () => {
    this.setState({visible: true}); //展示弹窗
  };

	//确定按钮的回调
  handleOk = () => {
    this.setState({visible: false});
  };

	//取消按钮的回调
  handleCancel = () => {
    this.setState({visible: false});
  };
	
	render() {
		const {getFieldDecorator} = this.props.form;
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
			<div>
				<Card 
					extra={
						<Button type="primary" onClick={this.showModal}>
							<Icon type="plus-circle"/>添加
						</Button>
					}
				>
					<Table 
						dataSource={dataSource} 
						columns={columns} 
						bordered
					/>
				</Card>
				{/* 弹窗 */}
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
