export interface IItem{
    id:number,
    label?:string,
    status?:boolean,
    filter?:string,
    parent?:string,
    text?:string
}

export interface defaultStateType{
    items:IItem[];
    trashItems:IItem[];
}

export interface action{
    type:string,
    payload:IItem
}