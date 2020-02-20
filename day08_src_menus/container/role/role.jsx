import React, { Component } from 'react'
import {Card,Button,Icon,Table,Modal,Form,Input,message,Tree} from 'antd';
import dayjs from 'dayjs'
import menus  from '../../config/menu-config'
import {connect} from 'react-redux'
import {reqRoleList,reqAddRole,reqAuthRole} from '../../api'
const {Item} = Form
const {TreeNode} = Tree;

@connect(
	(state)=>({name:state.userInfo.user.username}),
	{}
)
@Form.create()
class Role extends Component {

	state = {
		isShowAdd: false, //是否展示添加角色弹窗
		isShowAuth: false, //是否展示授权弹窗
		roleList:[], //角色列表（从服务器请求回来的）
    checkedKeys: [],//勾选的菜单
	};

	//请求角色列表
	getRoleList = async()=>{
		let result = await reqRoleList()
		const {status,data,msg} = result
		if(status === 0) this.setState({roleList:data})
		else message.error(msg)
	}

	componentDidMount(){
		this.getRoleList()
	}

	//展示添加角色弹窗
  showAdd = () => {
    this.setState({isShowAdd: true,});
	};
	//展示授权弹窗
	showAuth = (id) => {
		this._id = id
		let result = this.state.roleList.find((roleObj)=>{
			return roleObj._id === id
		})
		if(result){
			this.setState({isShowAuth: true,checkedKeys:result.menus});
		}
  };

	//新增角色----确认按钮的回调
  handleAddOk = () => {
		this.props.form.validateFields(async(err,values)=>{
			if(!err){
				console.log('发送请求',values);
				let result = await reqAddRole(values.roleName)
				const {status,msg} = result
				if(status === 0){
					message.success('添加角色成功')
					this.props.form.resetFields()//重置表单
					this.setState({isShowAdd: false,});
					this.getRoleList()
				}else{
					message.error(msg)
				}
				
			}
		})
		
	};

	//新增角色----取消按钮的回调
  handleAddCancel = () => {
		this.props.form.resetFields()//重置表单
    this.setState({isShowAdd: false,});//隐藏弹窗
	}
	
	//授权----确认按钮的回调
  handleAuthOk = async() => {
		const {checkedKeys} = this.state
		const {name} = this.props
		let result = await reqAuthRole(this._id,name,checkedKeys)
		const {status,msg} = result
		if(status === 0){
			message.success('授权成功')
			this.setState({isShowAuth: false,});
			this.getRoleList()
		}else{
			message.error(msg)
		}
  };

	//授权----取消按钮的回调
  handleAuthCancel = () => {
    this.setState({isShowAuth: false,});
	}

	//当勾选了一个节点的回调
  onCheck = checkedKeys => {
    this.setState({ checkedKeys });
  };

	//根据数据，渲染树形结构
  renderTreeNodes = data =>
    data.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.key} {...item} />;
    });

	render() {
		const {getFieldDecorator} = this.props.form;
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
				render:(time)=> dayjs(time).format('YYYY年 MM月 DD日 HH:mm:ss')
			},
			{
				title: '授权时间',
				dataIndex: 'auth_time',
				key: 'auth_time',
				render:(time)=> time ? dayjs(time).format('YYYY年 MM月 DD日 HH:mm:ss') : ''
			},
			{
				title: '授权人',
				dataIndex: 'auth_name',
				key: 'auth_name',
				align:'center'
			},
			{
				title: '操作',
				dataIndex: '_id',
				key: 'opera',
				align:'center',
				render:(id)=> <Button type="link" onClick={()=>{this.showAuth(id)}}>设置权限</Button>
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
						dataSource={this.state.roleList}
						columns={columns}
						bordered
						rowKey="_id"
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
          <Tree
						checkable //控制每个树的节点是否可以选择
						defaultExpandAll
						//onExpand={this.onExpand}//当展开一个节点时候的回调
						//expandedKeys={this.state.expandedKeys} //展开了哪些节点
						//autoExpandParent={this.state.autoExpandParent}//自动展开父节点
						onCheck={this.onCheck}//当勾选一个节点时的回调
						checkedKeys={this.state.checkedKeys}//已经勾选了的节点
						//onSelect={this.onSelect}//当选择一个节点时的回调
						//selectedKeys={this.state.selectedKeys}//已经选择了的节点
					>
						{this.renderTreeNodes(menus)}
					</Tree>
        </Modal>
			</div>
		)
	}
}
export default Role
