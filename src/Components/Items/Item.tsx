import React, {FC} from "react";
import {Card, CardActionArea, CardContent, Typography} from "@material-ui/core";
import {useStyles} from "./ItemStyle";
import DeleteIcon from '@material-ui/icons/Delete';
import {useDispatch} from "react-redux";
import {IItem} from "../Type/Type";
import {deleteItem} from "../../Toolkit/toolkitReducer";
import Icon from "./Icon";
import {ItemProps} from "./Type";


const Item:FC<ItemProps> = ({item}) => {

    const classes = useStyles();
    const dispatch = useDispatch()

    const trashItem =  (item:IItem) => {
        dispatch(deleteItem(item))
    }

    return (
      <>
            <Card className={classes.root}>
                <CardActionArea>
                    <Icon item = {item} />
                    <CardContent className = {classes.cardContent}>
                        <Typography
                            gutterBottom variant = "h5"
                            component = "h2"
                        >
                            {item.label}
                        </Typography>
                        <DeleteIcon
                            className = {classes.deleteIcon}
                            onClick = { () => trashItem(item)}
                        />
                    </CardContent>
                </CardActionArea>
            </Card>
          </>
    )
}

export default Item