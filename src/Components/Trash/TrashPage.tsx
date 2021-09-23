import React, {FC, SyntheticEvent, useState} from "react";
import {Button} from "@material-ui/core";
import {useStyles} from "./TrashStyle";
import {useDispatch} from "react-redux";
import {deleteTrashItems, restoreTrashItem} from "../Redux/action.creator";
import {useHistory} from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import {Alert} from "@material-ui/lab";
import {IItem} from "../Type/Type";
import TrashItem from "./TrashItem";

const TrashPage:FC<{trash:IItem[]; items:IItem[] }> = ({trash,items}) =>  {

    const classes = useStyles();
    const dispatch = useDispatch()
    const history = useHistory()
    const [folderOpen, setFolderOpen] = useState(false);
    const [docOpen, setDocOpen] = useState(false);
    const [added, setAdded] = useState(false);

    const handleClose = (event:SyntheticEvent, reason:string) => {
        if (reason === 'timeout') {
            return;
        }
        setFolderOpen(false);
        setDocOpen(false);
        setAdded(false)
    };

    const restoreItem = (trashItem:IItem) => {
        const existsFolder = items.some((item) => item.label === trashItem.label &&  trashItem.filter === 'folder'  && item.filter === 'folder')
        const existsDoc = items.some((item) => item.label === trashItem.label && trashItem.filter === 'doc' && item.filter === 'doc')

        if (existsFolder) {
            setFolderOpen(true)
        }
        else if(existsDoc)
        {
            setDocOpen(true)
        }
        else
        {
            dispatch(restoreTrashItem(trashItem))
            setAdded(true)
        }
    }

    const deleteTrash = () => {
        dispatch(deleteTrashItems())
    }

    const item = trash.filter((item) => item.status === true )

    return (
        <div>
            <Snackbar
                open = {folderOpen}
                onClose = {handleClose}
                anchorOrigin = {{
                    vertical: 'top',
                    horizontal: 'right'
                }}>
                <Alert severity = "error">
                    There is a folder with this name
                </Alert>
            </Snackbar>

            <Snackbar
                open = {docOpen}
                onClose = {handleClose}
                anchorOrigin = {{
                    vertical: 'top',
                    horizontal: 'right'
                }}>
                <Alert severity = "error">
                    There is a doc with this name
                </Alert>
            </Snackbar>

            <Snackbar
                open = {added}
                onClose = {handleClose}
                anchorOrigin = {{
                    vertical: 'top',
                    horizontal: 'right'
                }}>
                <Alert severity = "success">
                    Restored
                </Alert>
            </Snackbar>

            <div>
                {item.map((item) => {
                    return (
                        <TrashItem
                            key = {item.id}
                            trashItem = {item}
                            restoreItem = {restoreItem}
                        />
                    )
                })}
            </div>
            <Button
                variant = "contained"
                color = "primary"
                className = {classes.btn}
                onClick = {deleteTrash}
            >
                Delete
            </Button>
            <Button
                variant = "contained"
                color = "primary"
                className = {classes.btn}
                onClick = { () => history.push(`/`)}
            >
                Home
            </Button>
        </div>
    )
}

export default TrashPage;