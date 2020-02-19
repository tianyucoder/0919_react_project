import {GET_CATEGORY_LIST} from '../action_types'
import {message} from 'antd'
import {reqCategoryList} from '../../api'

//同步action
const createGetCategoryAction = (categoryList)=>({type:GET_CATEGORY_LIST,data:categoryList})

//异步action
export const createGetCategoryAsyncAction = ()=>{
	//套路1：一个异步的action，一般都会匹配一个同步的action
	//套路2：在异步action所返回的那个函数里，我们去做真正的异步操作：定时器、ajax请求

	/* 正常来说一个actionCreator应该返回一个Object类型的js对象
	如果是异步action，那么就返回一个函数，由redux底层帮我们去调用这个函数
	redux帮我们调用上方的这个函数时，传递了dispatch方法，让我们可以该函数内dispatch同步action */
	return async(dispatch)=>{
		let result = await reqCategoryList() //联系服务器，请求商品分类数据
		const {status,data,msg} = result//读取返回的数据
		if(status === 0 ) dispatch(createGetCategoryAction(data.reverse()))//无错误，商品分类信息存入redux
		else message.error(msg)//有错误，提示错误
	}
}