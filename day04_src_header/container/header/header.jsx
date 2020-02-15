import React, {Component} from 'react'
import {Button,Icon,Modal} from 'antd'
import screenfull from 'screenfull'
import {connect} from 'react-redux'
import {reqWeather} from '../../api'
import dayjs from 'dayjs'
import {createDeleteUserInfoAction} from '../../redux/actions/login'
import './header.less'
const {confirm} = Modal;

@connect(
	(state)=>({userInfo:state.userInfo}),//映射状态
	{deleteUserInfo:createDeleteUserInfoAction}//映射操作状态的方法
)
class Header extends Component {

	state = {
		isFull:false,//标识是否全屏
		date:dayjs().format('YYYY年 MM月 DD日 HH:mm:ss'),
		weatherData:{pic:'',temp:''}
	}

	//退出登录方法
	logout = ()=>{
		confirm({
			title: '确定退出吗？',
			content: '退出后需要重新登录',
			okText:'确定',
			cancelText:'取消',
			onOk:()=> {
				//操作redux状态，实现退出登录
				this.props.deleteUserInfo()
			},
		});
	}

	//切换全屏
	fullscreen = ()=>{
		screenfull.toggle()
	}

	getWeatherData = async()=>{
		//发送ajax请求获取天气数据
		let weatherData = await reqWeather()
		const {temperature,dayPictureUrl} = weatherData
		this.setState({weatherData:{pic:dayPictureUrl,temp:temperature}})
	}

	async componentDidMount (){
		//检测全屏变化
		screenfull.on('change',() => {
			const isFull = !this.state.isFull
			this.setState({isFull}) //更新全屏状态标识符
		});
		//更新时间
		this.timeId = setInterval(()=>{
			this.setState({date:dayjs().format('YYYY年 MM月 DD日 HH:mm:ss')})
		},1000)
		//调用getWeatherData，获取天气信息
		this.getWeatherData()
	}

	componentWillUnmount(){
		clearInterval(this.timeId)
	}

	render() {
		const {username} = this.props.userInfo.user
		return (
			<div className="header">
				<div className="header-top">
					<Button size="small" onClick={this.fullscreen}>
						<Icon type={this.state.isFull ? 'fullscreen-exit' : 'fullscreen'}/>
					</Button>
					<span>欢迎，{username}</span>
					<Button type="link" onClick={this.logout}>退出登录</Button>
				</div>
				<div className="header-bottom">
					<div className="bottom-left">
						<span>首页</span>
					</div>
					<div className="bottom-right">
						<span>{this.state.date}</span>
						<img src={this.state.weatherData.pic} alt="天气图标"/>
						<span>温度：{this.state.weatherData.temp}</span>
					</div>
				</div>
			</div>
		)
	}
}

export default Header
