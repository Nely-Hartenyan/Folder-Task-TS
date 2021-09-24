import Types from "./action.type";
import {IItem} from "../Components/Type/Type";


export function addNewFolder (payload:IItem) {
    return{
        type: Types.ADD_NEW_FOLDER,
        payload: payload
    }
}

export function addNewDoc (payload:IItem){
    return {
        type:Types.ADD_NEW_DOC,
        payload:payload
    }
}

export function deleteItem (payload:IItem){
    return {
        type:Types.DELETE_ITEM,
        payload:payload
    }
}


export function deleteTrashItem (payload:IItem){
    return {
        type:Types.DELETE_TRASH_ITEM,
        payload:payload
    }
}

export function restoreTrashItem ( payload:IItem ){
    return {
        type: Types.RESTORE_TRASH_ITEM,
        payload: payload
    }
}

export function deleteTrashItems(){
    return {
        type: Types.DELETE_TRASH
    }
}

export function addDocText (payload:IItem){
    return {
        type:Types.ADD_DOC_TEXT,
        payload:payload
    }
}