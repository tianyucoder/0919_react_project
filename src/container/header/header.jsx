import React, {Component} from 'react'
import {Button,Icon} from 'antd'
import screenfull from 'screenfull'
import './header.less'

export default class Header extends Component {

	state = {
		isFull:false
	}

	fullscreen = ()=>{
		screenfull.toggle()
	}

	componentDidMount(){
		screenfull.on('change',() => {
			const isFull = !this.state.isFull
			this.setState({isFull})
		});
	}

	render() {
		return (
			<div className="header">
				<div className="header-top">
					<Button size="small" onClick={this.fullscreen}>
						<Icon type={this.state.isFull ? 'fullscreen-exit' : 'fullscreen'}/>
					</Button>
					<span>欢迎，xxxx</span>
					<Button type="link">退出登录</Button>
				</div>
				<div className="header-bottom">
					<div className="bottom-left">
						<span>首页</span>
					</div>
					<div className="bottom-right">
						<span>2020年2月15日 00:00:00</span>
						<img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1581757829993&di=3eeaaf4aaacbf5f566dd6608027e91e4&imgtype=0&src=http%3A%2F%2Fimg1.huaihai.tv%2Fmaterial%2Fnews%2Fimg%2F2016%2F09%2F20160926065045wbF7.png" alt=""/>
						<span>温度：xxxxx</span>
					</div>
				</div>
			</div>
		)
	}
}
