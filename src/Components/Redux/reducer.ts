import Types from "./action.type";
import {defaultStateType, action, IItem} from "../Type/Type";


const defaultState:defaultStateType = {
    items:[],
    trashItems:[],
}

export const Reducer = (state:defaultStateType= defaultState, action:action) => {
    switch (action.type){

        case Types.ADD_NEW_FOLDER:
            const existsFolder = state.items.some(item => item.filter === action.payload.filter
                && item.label === action.payload.label
                &&  item.parent === action.payload.parent)

            if ( existsFolder ){
                return {...state}
            }
            return { ...state, items: [...state.items, action.payload]}

        case Types.ADD_NEW_DOC:
            const existsDoc = state.items.some(item => item.label === action.payload.label
                && item.filter === action.payload.filter
                && item.parent === action.payload.parent );

            if( existsDoc ){
                return {...state}
            }
            return {...state, items: [...state.items, action.payload]}

        case Types.ADD_DOC_TEXT:
           state.items.map( (item) => {
                if (item?.id === action?.payload.id)
                    return item.text = action.payload.text;
                return item
            })
            return {...state, items: [...state.items]}

        case Types.DELETE_ITEM:
            const trashFiles:IItem[] = [];
            const trashRecursFunc = (fileId:number) => {
                for (let i = 0; i < state.items.length; i++) {
                    if (Number(state.items[i].parent)=== fileId) {
                        const fileID = state.items[i].id;
                        const fileType = state.items[i].filter;
                        const item = state.items.splice(i, 1);
                        trashFiles.push(item[0]);
                        i = i - 1;
                        if (fileType === "folder") {
                            trashRecursFunc(fileID);
                        }
                    }
                }
            };
            trashRecursFunc(action.payload.id);
            const endFile = state.items.filter((item) => {
                if (item.id === action.payload.id) {
                    item.status = true
                    trashFiles.push(item);
                    return false;
                }
                return true;
            });
            return {
                ...state,
                items: endFile,
                trashItems: [...trashFiles, ...state.trashItems],
            };

        case Types.DELETE_TRASH_ITEM:{
            const deleteFiles:IItem[] = [];
            const deleteRecursFunc = (fileId:number) => {
                for (let i = 0; i < state.trashItems.length; i++) {
                    if (Number(state.trashItems[i].parent)=== fileId) {
                        const fileID = state.trashItems[i].id;
                        const fileType = state.trashItems[i].filter;
                        const item = state.trashItems.splice(i, 1);
                        deleteFiles.push(item[0]);
                        i = i - 1;
                        if (fileType === "folder") {
                            deleteRecursFunc(fileID);
                        }
                    }
                }
            };
            deleteRecursFunc(action.payload.id);
            const endTrash = state.trashItems.filter((item) => {
                if (item.id === action.payload.id) {
                    item.status = false
                    deleteFiles.push(item);
                    return false;
                }
                return true;
            });
            return {
                ...state,
                trashItems: endTrash,
            };
        }

        case Types.RESTORE_TRASH_ITEM:
            const restoreFiles:IItem[] = [];
            const restoreRecursFunc = (fileId:number) => {
                for (let i = 0; i < state.trashItems.length; i++) {
                    if (Number(state.trashItems[i].parent)=== fileId) {
                        const fileID = state.trashItems[i].id;
                        const fileType = state.trashItems[i].filter;
                        const item = state.trashItems.splice(i, 1);
                        restoreFiles.push(item[0]);
                        i = i - 1;
                        if (fileType === "folder") {
                            restoreRecursFunc(fileID);
                        }
                    }
                }
            };
            restoreRecursFunc(action.payload.id);
            const endTrash = state.trashItems.filter((item) => {
                if (item.id === action.payload.id) {
                    item.status = false
                    restoreFiles.push(item);
                    return false;
                }
                return true;
            });
            return {
                ...state,
                items: [...restoreFiles, ...state.items],
                trashItems: endTrash,
            };

        case Types.DELETE_TRASH:
            return { ...state, trashItems: []}

        default:
            return state
    }
}
