import React, {FC} from "react";
import Form from "./Form/Form";
import {IItem} from "./Type/Type";
import Item from "./Items/Item";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import {useHistory} from "react-router-dom";

interface ContainerProps{ items:IItem[] }

const Container:FC<ContainerProps> = ( { items } ) => {

    const history = useHistory()
    const item = items.filter( (item:IItem) => item.parent === '0')

    return (
        <div>
            <ArrowForwardIcon onClick = {() => history.goForward()}/>
            <Form items = { items }/>
            { item.map((item:IItem) => {
                return (
                    <Item
                        key = { item.id }
                        item = { item }
                    />
                )
            })}
        </div>
    );
}

export default Container;