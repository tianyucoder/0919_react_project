//该文件是对axios的二次封装
import axios from 'axios'
//引入querystring,用于转换请求的参数
import qs from 'querystring'

//使用axios的请求拦截器
axios.interceptors.request.use((config)=>{
	//config是配置对象，里面包含着所有本次请求的必要信息，比如：请求方式、请求的地址
	const {method,data} = config
	//如果是post请求，且请求体参数为json编码，那么就要转换为urlencoded
	if(method.toLowerCase() === 'post' && data instanceof Object){
		config.data = qs.stringify(data)
	}
	console.log('请求拦截器',config.data);
	return config
})

export default axios
