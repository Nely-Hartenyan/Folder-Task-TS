import React, {FC} from "react";
import {useParams} from "react-router-dom";
import {IItem} from "../Type/Type";
import TrashItem from "./TrashItem";
import {TrashItemsProps} from "./Type";


const TrashItems:FC<TrashItemsProps> = ({trash}) => {

    const {Folderid} = useParams<{Folderid?: string}>()

    const folders = trash.filter((item:IItem) => item.parent === Folderid)

    return(
        <div>
            {folders.map((trashItem:IItem) => {
                return (
                    <TrashItem
                        trashItem = {trashItem}
                        key = {trashItem.id}
                    />
                )
            })}
        </div>
    )
}

export default TrashItems;