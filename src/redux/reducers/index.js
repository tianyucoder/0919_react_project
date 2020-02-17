import loginReducer from './login'
import headerReducer from './header'
import categoryReducer from './category'
import {combineReducers} from 'redux'

export default combineReducers({
	userInfo:loginReducer,
	headerTitle:headerReducer,
	categoryList:categoryReducer,
})