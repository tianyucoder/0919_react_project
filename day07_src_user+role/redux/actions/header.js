import {SAVE_HEADER_TITLE,DELETE_HEADER_TITLE} from '../action_types'

export const createSaveTitleAction = (title) => ({type:SAVE_HEADER_TITLE,data:title})

export const createDeleteTitleAction = ()=> ({type:DELETE_HEADER_TITLE,data:''})