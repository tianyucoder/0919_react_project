import React, { Component } from 'react'
import Login from './container/login/login'
import Admin from './container/admin/admin'
import {Route,Switch,Redirect} from 'react-router-dom'

export default class App extends Component {
	render() {
		return (
			<Switch>
				<Route path="/login" component={Login}/>
				<Route path="/admin" component={Admin}/>
				<Redirect to="/login"/>
			</Switch>
		)
	}
}
