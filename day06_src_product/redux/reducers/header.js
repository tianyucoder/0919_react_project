import {SAVE_HEADER_TITLE,DELETE_HEADER_TITLE} from '../action_types'

export default function (preState='',action){
	const {type,data} = action
	let newState
	switch (type) {
		case SAVE_HEADER_TITLE:
			newState = data
			return newState
		case DELETE_HEADER_TITLE:
			newState = ''
			return newState
		default:
			return preState
	}
}