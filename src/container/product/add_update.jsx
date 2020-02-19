//该组件用于新增或修改商品
import React, { Component } from 'react'
import {connect} from 'react-redux'
import {createGetCategoryAsyncAction} from '../../redux/actions/category'
import {Card,Button,Icon,Form,Input,Select, message} from 'antd'
import {reqAddProduct,reqProductById,reqUpdateProduct} from '../../api'
import PictureWall from './picture_wall'
import RichTextEditor from './rich_text_editor'

const {Item} = Form
const {Option} = Select

@connect(
	(state)=>({categoryList:state.categoryList}),
	{getCategoryList:createGetCategoryAsyncAction}
)
@Form.create()
class AddUpdate extends Component {

	state = {
		currentProd:{
			_id:'',
			categoryId:'',
			name:'',
			desc:'',
			price:'',
			detail:'',
			imgs:[],
			status:'',
		}
	}

	//根据id获取商品信息
	getProductById = async(id)=>{
		//1.根据id获取要修改商品的详细信息
		let result = await reqProductById(id)
		const {status,data,msg} = result
		if(status === 0){
			this.setState({currentProd:data})
			this.refs.PictureWall.setImgNames(data.imgs)
			this.refs.RichTextEditor.setRichText(data.detail)
		}else{
			message.error(msg)
		}
		
	}

	componentDidMount(){
		//若redux中没有categoryList，分发一个获取列表的action
		if(!this.props.categoryList.length) this.props.getCategoryList()
		//看有没有id，若有，是修改；若没有，是新增
		const {id} = this.props.match.params
		if(id) this.getProductById(id)
	}

	//响应表单提交的
	handleSubmit = (event)=>{
    event.preventDefault()
    this.props.form.validateFields(async(err, values) => {
      if(!err){
				const detail = this.refs.RichTextEditor.getRichText()
				const imgs = this.refs.PictureWall.getImgNames()
				values.detail = detail
				values.imgs = imgs
				const {_id} = this.state.currentProd
				let result 
				if(_id){
					values._id = _id
					result = await reqUpdateProduct(values)
				}else{
					result = await reqAddProduct(values)
				}
				const {status,msg} = result
				if(status === 0){
					message.success('操作商品成功')
					this.props.history.replace('/admin/prod_about/product')
				}else{
					message.error(msg)
				}
			}
    });
  }

	render() {
		const {getFieldDecorator} = this.props.form;
		const {categoryId,name,desc,price} = this.state.currentProd
    return (
        <Card 
          title={
            <div>
              <Button type="link" onClick={this.props.history.goBack}>
                <Icon type="arrow-left"/>
                <span>返回</span>
              </Button>
						<span>商品{this.state.currentProd._id?'修改':'添加'}</span>
            </div>}
        >
          <Form 
						onSubmit={this.handleSubmit}
						labelCol={{span:2}}
						wrapperCol={{span:7}}
          >
            <Item label="商品名称">
              {getFieldDecorator('name', {
								  initialValue:name || '',
                  rules: [{required: true, message: '请输入商品名称' }],
                })(<Input placeholder="商品名称"/>)}
            </Item>
            <Item label="商品描述">
              {getFieldDecorator('desc', {
								initialValue:desc || '',
                rules: [{required: true, message: '请输入商品描述' }],
              })(<Input placeholder="商品描述"/>)}
            </Item>
            <Item label="商品价格">
              {getFieldDecorator('price', {
								initialValue:price || '',
                rules: [{required: true, message: '请输入商品价格' }],
              })(<Input placeholder="商品价格" />)}
            </Item>
            <Item label="商品分类">
              {getFieldDecorator('categoryId', {
								initialValue:categoryId || '',
                rules: [{required: true, message: '请选择一个分类' }],
              })(<Select>
									<Option value=''>请选择分类</Option>
                  {this.props.categoryList.map((obj)=>{
											return <Option key={obj._id} value={obj._id}>{obj.name}</Option>
										})}
                </Select>)}
            </Item>
            <Item label="商品图片">
              <PictureWall ref="PictureWall"/>
            </Item>
            <Item label="商品详情" wrapperCol={{span:15}}>
              <RichTextEditor ref="RichTextEditor"/>
            </Item>
            <Button type="primary" htmlType="submit">提交</Button>
          </Form>
        </Card>
    )
  }
}
export default AddUpdate
