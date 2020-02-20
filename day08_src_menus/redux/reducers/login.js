import {SAVE_USERINFO,DELETE_USERINFO} from '../action_types'

/* 
	尝试从localStorage中读取用户信息：
			第一种情况：读取到了，用户登录过了，用读取出来的数据初始化redux保存的state。
			第二种情况：未读取到，用户没有登录过，或登录过，但是手动清空了localStorage中的数据，初始化一个空的state
*/
const _user = JSON.parse(localStorage.getItem('user'))
const _token = localStorage.getItem('token')

let initState = {
	user:_user || {},
	token:_token || '',
	isLogin: (_user && _token) ? true : false
}

export default function (preState=initState,action){
	const {type,data} = action
	let newState
	switch (type) {
		case SAVE_USERINFO:
			const {user,token} = data
			newState = {user,token,isLogin:true}
			return newState
		case DELETE_USERINFO:
			newState = {user:{},token:'',isLogin:false}
			return newState
		default:
			return preState
	}
}