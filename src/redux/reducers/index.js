import loginReducer from './login'
import headerReducer from './header'
import {combineReducers} from 'redux'

export default combineReducers({
	userInfo:loginReducer,
	headerTitle:headerReducer
})