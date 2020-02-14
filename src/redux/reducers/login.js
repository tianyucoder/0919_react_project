import {SAVE_USERINFO} from '../action_types'

let initState = {
	user:{},
	token:''
}

export default function (preState=initState,action){
	const {type,data} = action
	let newState
	switch (type) {
		case SAVE_USERINFO:
			const {user,token} = data
			newState = {user,token}
			return newState
		default:
			return preState
	}
}