export interface IItem{
    id:number,
    label?:string,
    status?:boolean,
    type?:string,
    parent?:string,
    text?:string
}

export interface DefaultStateType{
    items:IItem[];
    trashItems:IItem[];
}

export interface Action{
    type:string,
    payload:IItem
}