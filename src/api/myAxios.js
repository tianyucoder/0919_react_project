//该文件是对axios的二次封装
import axios from 'axios'
//引入querystring,用于转换请求的参数
import qs from 'querystring'
//引入antd
import {message} from 'antd'
//引入请求基本路径
import {BASE_URL} from '../config'

axios.defaults.baseURL = BASE_URL

//使用axios的请求拦截器
axios.interceptors.request.use((config)=>{
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
		//如果响应的状态码为2开头，axios认为响应就是成功的
		//console.log('响应拦截器--成功的');
		return response.data
	},
	(err)=>{
		//如果响应的状态码不是2开头，或者连接超时，axios认为响应就是失败的
		//console.log('响应拦截器--失败',err.message);
		message.error('请求失败，请联系管理员！')
		//return Promise.reject(error.message) //这样写，会触发axios发送请求失败的回调
		return new Promise(()=>{}) //这样写，不会触发axios发送请求失败的回调
	}
)

export default axios
