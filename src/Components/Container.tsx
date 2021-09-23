import React, {FC} from "react";
import Form from "./Form/Form";
import {IItem} from "./Type/Type";
import Item from "./Items/Item";

const Container:FC<{items:IItem[]}> = ( { items } ) => {

    const item = items.filter( (item:IItem) => item.parent === '0')

    return (
        <div>
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