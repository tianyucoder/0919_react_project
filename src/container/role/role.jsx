import React, { Component } from 'react'
import { Card,Button,Icon,Table,Modal,Form,Input} from 'antd';
const {Item} = Form

@Form.create()
class Role extends Component {

	state = {
		isShowAdd: false, //是否展示添加角色弹窗
		isShowAuth: false //是否展示授权弹窗
	};

	//展示添加角色弹窗
  showAdd = () => {
    this.setState({isShowAdd: true,});
	};
	
	showAuth = () => {
    this.setState({isShowAuth: true,});
  };

	//新增角色----确认按钮的回调
  handleAddOk = () => {
		this.setState({isShowAdd: false,});
	};
	
	//授权----确认按钮的回调
  handleAuthOk = () => {
		this.setState({isShowAuth: false,});
  };

	//新增角色----取消按钮的回调
  handleAddCancel = () => {
    this.setState({isShowAdd: false,});
	}

	//授权----取消按钮的回调
  handleAuthCancel = () => {
    this.setState({isShowAuth: false,});
	}

	render() {
		const {getFieldDecorator} = this.props.form;
		const dataSource = [
			{
				_id: '5ca9eaa1b49ef916541160d3',
				name: '测试',
				create_time: 1554639521749,
				auth_time: 1558679920395,
				auth_name: "程老师"
			},
		];
		const columns = [
			{
				title: '角色名称',
				dataIndex: 'name',
				key: 'name',
			},
			{
				title: '创建时间',
				dataIndex: 'create_time',
				key: 'create_time',
			},
			{
				title: '授权时间',
				dataIndex: 'auth_time',
				key: 'auth_time',
			},
			{
				title: '授权人',
				dataIndex: 'auth_name',
				key: 'auth_name',
				align:'center'
			},
			{
				title: '操作',
				//dataIndex: 'address',
				key: 'address',
				align:'center',
				render:()=> <Button type="link" onClick={this.showAuth}>设置权限</Button>
			},
		];
		return (
			<div>
				{/* Card组件 */}
				<Card title={
						<Button type="primary" onClick={this.showAdd}>
							<Icon type="plus-circle" />新增角色
						</Button>
				}>
					<Table 
						dataSource={dataSource}
						columns={columns}
						bordered
					/>
				</Card>
				{/* 新增角色的弹窗 */}
				<Modal
          title="新增角色"
          visible={this.state.isShowAdd}
          onOk={this.handleAddOk}
					onCancel={this.handleAddCancel}
					okText="确认"
					cancelText="取消"
        >	
				<Form className="login-form">
					<Item>
						{getFieldDecorator('roleName', {
								rules: [{required: true, message: '角色名必须输入'}]
							})(<Input placeholder="角色名"/>)
						}
					</Item>
				</Form>

          
        </Modal>
				{/* 授权弹窗 */}
				<Modal
          title="授权"
          visible={this.state.isShowAuth}
          onOk={this.handleAuthOk}
					onCancel={this.handleAuthCancel}
					okText="确认"
					cancelText="取消"
        >
          Tree组件
        </Modal>
			</div>
		)
	}
}
export default Role
