//该文件是对axios的二次封装
import axios from 'axios'
//引入querystring,用于转换请求的参数
import qs from 'querystring'
//引入antd
import {message} from 'antd'
//引入请求基本路径
import {BASE_URL} from '../config'
//引入NProgress,用于实现请求进度条效果
import NProgress from 'nprogress'
//引入store，目的是获取redux中的token
import store from '../redux/store'
//引入action，用于创建action
import {createDeleteTitleAction} from '../redux/actions/header'
import {createDeleteUserInfoAction} from '../redux/actions/login'
//引入NProgress样式
import 'nprogress/nprogress.css'
//请求基本路径
axios.defaults.baseURL = BASE_URL

//使用axios的请求拦截器
axios.interceptors.request.use((config)=>{
	//如果redux中存有当前登录用户的token
	if(store.getState().userInfo.token){
		const {token} =  store.getState().userInfo
		//在请求头中携带token，让服务器“认识”用户
		config.headers.Authorization = 'atguigu_'+token
	}
	NProgress.start()
	//config是配置对象，里面包含着所有本次请求的必要信息，比如：请求方式、请求的地址
	const {method,data} = config
	//如果是post请求，且请求体参数为json编码，那么就要转换为urlencoded
	if(method.toLowerCase() === 'post' && data instanceof Object){
		config.data = qs.stringify(data)
	}
	return config
})

//使用axios的响应拦截器
axios.interceptors.response.use(
	(response)=>{
		NProgress.done()
		//如果响应的状态码为2开头，axios认为响应就是成功的
		//console.log('响应拦截器--成功的');
		return response.data
	},
	(err)=>{
		NProgress.done()
		//如果响应的状态码不是2开头，或者连接超时，axios认为响应就是失败的
		if(err.response.status === 401){
			//如果服务器返回状态码是401，意味着用户的token失效
			message.error('身份过期，请重新登录')
			store.dispatch(createDeleteTitleAction()) //删除redux中用户信息
			store.dispatch(createDeleteUserInfoAction()) //删除redux中头部标题
		}else{
			//如果不是401，就证明是其他错误
			message.error('请求失败，请联系管理员！')
		}
		return new Promise(()=>{}) //这样写，不会触发axios发送请求失败的回调
	}
)

export default axios
