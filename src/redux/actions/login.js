import {SAVE_USERINFO,DELETE_USERINFO} from '../action_types'

export const createSaveUserInfoAction = (peronObj)=> {
	//向localStorage中保存用户信息，目的是防止刷新后redux数据丢失
	const {user,token} = peronObj
	localStorage.setItem('user',JSON.stringify(user))
	localStorage.setItem('token',token)
	return {type:SAVE_USERINFO,data:peronObj}
}

export const createDeleteUserInfoAction = ()=>{
	localStorage.clear()
	return {type:DELETE_USERINFO,data:''}
}