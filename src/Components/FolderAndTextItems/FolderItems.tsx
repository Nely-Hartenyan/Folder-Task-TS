import React, {FC} from "react";
import {useHistory, useParams} from "react-router-dom";
import Form from "../Form/Form";
import {IItem} from "../Type/Type";
import Item from "../Items/Item";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import {FolderProps} from "./Type";


const FolderItems:FC<FolderProps> = ( { items } ) => {

    const { Folderid } = useParams<{Folderid?: string}>()
    const history = useHistory()

    const folders = items.filter((item:IItem)  => item.parent === Folderid )

    return(
        <div>

            <ArrowBackIcon onClick = {() => history.goBack()}/>
            <ArrowForwardIcon onClick = {() => history.goForward()}/>
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
) }

export default FolderItems;