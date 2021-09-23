import React, {FC} from "react";
import { useParams } from "react-router-dom";
import Form from "../Form/Form";
import {IItem} from "../Type/Type";
import Item from "../Items/Item";

interface IProps {
    items:IItem[];
}

const FolderItems:FC<IProps> = ( { items } ) => {

    const { Folderid } = useParams<{Folderid?: string}>()

    const folders = items.filter((item:IItem)  => item.parent === Folderid )

    return(
        <div>
            <Form items = { items }/>
            { folders.map( (item:IItem) => {
                return (
                    <Item
                        key = { item.id }
                        item = { item }
                    />
                )
            })}

        </div>
)
}

export default FolderItems;