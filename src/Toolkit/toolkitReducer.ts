import {createSlice} from "@reduxjs/toolkit";
import {Action, DefaultStateType, IItem} from "../Components/Type/Type";

const defaultState:DefaultStateType = {
    items:[],
    trashItems:[],
}

const toolkitReducer = createSlice({
    name:'fileFolder',
    initialState:defaultState,
    reducers:{
        addNewFolder(state, action:Action){
            const existsFolder = state.items.some(item => item.type === action.payload.type
                && item.label === action.payload.label
                &&  item.parent === action.payload.parent)

            if ( existsFolder ){
                return state
            }
            state.items.push(action.payload)
        },
        addNewDoc(state,action:Action){
            const existsDoc = state.items.some(item => item.label === action.payload.label
                && item.type === action.payload.type
                && item.parent === action.payload.parent );

            if( existsDoc ){
                return state
            }
            state.items.push(action.payload)
        },
        addDocText(state, action:Action){
            state.items = state.items.map( (item) => {
                if (item?.id === action?.payload.id)
                    return {...item, text:action.payload.text}
                return item
            })
        },
        deleteItem(state,action:Action){
            const trashFiles:IItem[] = [];
            const trashRecursF = (fileId:number) => {
                for (let i = 0; i < state.items.length; i++) {
                    if (Number(state.items[i].parent)=== fileId) {
                        const fileID = state.items[i].id;
                        const fileType = state.items[i].type;
                        const item = state.items.splice(i, 1);
                        console.log(item)

                        trashFiles.push(item[0]);
                        i = i - 1;
                        if (fileType === "folder") {
                            trashRecursF(fileID);
                        }
                    }
                }
            };
            trashRecursF(action.payload.id);
            state.items = state.items.filter((item) => {
                if (item.id === action.payload.id) {
                    item.status = true
                    trashFiles.push(item);
                    return false;
                }
                return true;
            });
            state.trashItems= state.trashItems.concat(trashFiles)
        },

        deleteTrashItem(state, action:Action){
            const deleteFiles:IItem[] = [];
            const deleteRecursFunc = (fileId:number) => {
                for (let i = 0; i < state.trashItems.length; i++) {
                    if (Number(state.trashItems[i].parent)=== fileId) {
                        const fileID = state.trashItems[i].id;
                        const fileType = state.trashItems[i].type;
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
            state.trashItems = state.trashItems.filter((item) => {
                if (item.id === action.payload.id) {
                    item.status = false
                    deleteFiles.push(item);
                    return false;
                }
                return true;
            });
        },
        restoreTrashItem(state, action:Action){
            const restoreFiles:IItem[] = [];
            const restoreRecursFunc = (fileId:number) => {
                for (let i = 0; i < state.trashItems.length; i++) {
                    if (Number(state.trashItems[i].parent)=== fileId) {
                        const fileID = state.trashItems[i].id;
                        const fileType = state.trashItems[i].type;
                        const item = state.trashItems.splice(i, 1);
                        console.log(item)

                        restoreFiles.push(item[0]);
                        i = i - 1;
                        if (fileType === "folder") {
                            restoreRecursFunc(fileID);
                        }
                    }
                }
            };
            restoreRecursFunc(action.payload.id);
            state.trashItems = state.trashItems.filter((item) => {
                if (item.id === action.payload.id) {
                    item.status = false
                    restoreFiles.push(item);
                    return false;
                }
                return true;
            });
            state.items = state.items.concat(restoreFiles)
        },
        deleteTrashItems(state){
            state.trashItems = [];
        }
    }
})

export default toolkitReducer.reducer;
export const {addNewFolder, addNewDoc, addDocText, deleteTrashItems, restoreTrashItem, deleteTrashItem, deleteItem} = toolkitReducer.actions