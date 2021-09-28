import React, {FC, SyntheticEvent, useState} from "react";
import {Button} from "@material-ui/core";
import {useStyles} from "./TrashStyle";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import {Alert} from "@material-ui/lab";
import {IItem} from "../Type/Type";
import TrashItem from "./TrashItem";
import {deleteTrashItem, deleteTrashItems, restoreTrashItem} from "../../Toolkit/toolkitReducer";
import {TrashProps} from "./Type";

const TrashPage:FC<TrashProps> = ({trash,items}) =>  {

    const classes = useStyles();
    const dispatch = useDispatch()
    const history = useHistory()
    const [folderOpen, setFolderOpen] = useState(false);
    const [docOpen, setDocOpen] = useState(false);
    const [added, setAdded] = useState(false);
    const [deleted,setDeleted]  = useState(false)

    const handleClose = (event:SyntheticEvent, reason:string) => {
        if (reason === 'timeout') {
            return;
        }
        setFolderOpen(false);
        setDocOpen(false);
        setAdded(false);
        setDeleted(false)
    };

    const restoreItem = (trashItem:IItem) => {
        const existsFolder = items.some((item) => item.label === trashItem.label &&  trashItem.type === 'folder'  && item.type === 'folder')
        const existsDoc = items.some((item) => item.label === trashItem.label && trashItem.type === 'doc' && item.type === 'doc')

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
        setDeleted(true)
    }

    const deleteItem = (trashItem:IItem) => {
        dispatch(deleteTrashItem(trashItem))
        setDeleted(true)

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
            <Snackbar
                open = {deleted}
                onClose = {handleClose}
                anchorOrigin = {{
                    vertical: 'top',
                    horizontal: 'right'
                }}>
                <Alert severity = "success">
                    Deleted
                </Alert>
            </Snackbar>

            <div>
                {item.map((item) => {
                    return (
                        <TrashItem
                            key = {item.id}
                            trashItem = {item}
                            restoreItem = {restoreItem}
                            deleteItem={deleteItem}
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
                Delete All
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