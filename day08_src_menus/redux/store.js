import {createStore,applyMiddleware} from 'redux'
import reducer from './reducers' //汇总之后的reducer
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

export default createStore(reducer,composeWithDevTools(applyMiddleware(thunk)))