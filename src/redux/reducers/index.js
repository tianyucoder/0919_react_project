import loginReducer from './login'
import {combineReducers} from 'redux'

export default combineReducers({
	userInfo:loginReducer
})