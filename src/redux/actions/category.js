import {GET_CATEGORY_LIST} from '../action_types'
import {message} from 'antd'
import {reqCategoryList} from '../../api'

//同步action
const createGetCategoryAction = (categoryList)=>({type:GET_CATEGORY_LIST,data:categoryList})

//异步action
export const createGetCategoryAsyncAction = ()=>{
	return async(dispatch)=>{
		let result = await reqCategoryList()
		const {status,data,msg} = result
		if(status === 0 ) dispatch(createGetCategoryAction(data))
		else message.error(msg)
	}
}