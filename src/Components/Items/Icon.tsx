import React, {FC} from "react";
import {CardMedia} from "@material-ui/core";
import FolderIcon from "@material-ui/icons/Folder";
import { typeOfItem} from "../Type/Type";
import {useStyles} from "./ItemStyle";
import {useHistory} from "react-router-dom";
import DescriptionIcon from '@material-ui/icons/Description';
import {ItemProps} from "./Type";

const Icon:FC<ItemProps> = ({item}) =>{

    const classes = useStyles();
    const history = useHistory();

    return (
        <CardMedia
            title = "Contemplative Reptile"
            onClick = {() => history.push(`/${item.type}/${item.id}`)}
        >
            {item.type === typeOfItem.folder  &&  <FolderIcon className={classes.icon}/> }
            {item.type === typeOfItem.doc &&  <DescriptionIcon className = {classes.icon}/> }
        </CardMedia>
    )
}

export default Icon