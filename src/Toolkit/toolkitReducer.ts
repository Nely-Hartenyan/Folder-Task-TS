import {createSlice} from "@reduxjs/toolkit";
import {Action, DefaultStateType, IItem} from "../Components/Type/Type";

const initialState = {
    items:[],
    trashItems:[],
} as DefaultStateType

let restoreOrDeleteFiles:IItem[] = [];

const recursFunc = (fileId:number, s:IItem[]) => {
    for (let i = 0; i < s.length; i++) {
        if (Number(s[i].parent)=== fileId) {
            const fileID = s[i].id;
            const fileType = s[i].type;
            const item = s.splice(i, 1);

            restoreOrDeleteFiles.push(item[0]);
            i = i - 1;
            if (fileType === "folder") {
                recursFunc(fileID,s);
            }
        }
    }
};

const toolkitReducer = createSlice({
    name:'fileFolder',
    initialState,
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

            recursFunc(action.payload.id, state.items);
            state.items = state.items.filter((item) => {
                if (item.id === action.payload.id) {
                    item.status = true
                    restoreOrDeleteFiles.push(item);
                    return false;
                }
                return true;
            });
            state.trashItems = state.trashItems.concat(restoreOrDeleteFiles)
            restoreOrDeleteFiles = []
        },

        deleteTrashItem(state, action:Action){

            recursFunc(action.payload.id,state.trashItems);
            state.trashItems = state.trashItems.filter((item) => {
                if (item.id === action.payload.id) {
                    item.status = false
                    restoreOrDeleteFiles.push(item);
                    return false;
                }
                return true;
            });
            restoreOrDeleteFiles = []
        },

        restoreTrashItem(state, action:Action){

           recursFunc(action.payload.id, state.trashItems);
            state.trashItems = state.trashItems.filter((item) => {
                if (item.id === action.payload.id) {
                    item.status = false
                    restoreOrDeleteFiles.push(item);
                    return false;
                }
                return true;
            });
            state.items = state.items.concat(restoreOrDeleteFiles)
            restoreOrDeleteFiles = []
        },

        deleteTrashItems(state){
            state.trashItems = [];
        }
    }
})

export default toolkitReducer.reducer;
export const {addNewFolder, addNewDoc, addDocText, deleteTrashItems, restoreTrashItem, deleteTrashItem, deleteItem} = toolkitReducer.actions