import {IItem} from "../Type/Type";

export  interface TrashItemProp{
    trashItem:IItem;
    restoreItem?:(trashItem:IItem) => void ;
    deleteItem?:(trashItem:IItem) => void ;
}

export interface TrashItemsProps {
    trash: IItem[]
}

export interface TrashProps {
    trash: IItem[];
    items: IItem[]
}