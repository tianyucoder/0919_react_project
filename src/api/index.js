//该文件用于保存所有发送ajax请求的方法，即：项目中所有的ajax请求，都要再次文件中准备一个请求函数
import myAxios from './myAxios'
import {WEATHER_BASE_URL,WEATHER_AK} from '../config'
import {message} from 'antd'
//引入jsonp发送请求
import jsonp from 'jsonp'

//请求登录接口
export const reqLogin = (username,password) => myAxios.post('/login',{username,password})
//请求天气接口
export const reqWeather = () => {
	const url = `${WEATHER_BASE_URL}?location=北京&output=json&ak=${WEATHER_AK}`
	return new Promise((resolve,reject)=>{
		jsonp(url,(err,data)=>{
			if(!err){
				const {temperature} = data.results[0].weather_data[0]
				const {dayPictureUrl} = data.results[0].weather_data[0]
				const weatherObj = {temperature,dayPictureUrl}
				resolve(weatherObj)
			}else{
				message.error('请求天气数据失败，请联系管理员')
			}
		})
	})
}
//请求分类列表
export const reqCategoryList = () => myAxios.get('/manage/category/list')
//请求添加商品分类
export const reqAddCategory = (categoryName) => myAxios.post('/manage/category/add',{categoryName})
//请求修改商品分类
export const reqUpdateCategory = (categoryId,categoryName) => myAxios.post('/manage/category/update',{categoryId,categoryName})



