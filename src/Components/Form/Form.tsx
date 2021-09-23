import React, {FC, SyntheticEvent, useState} from "react";
import { Button, TextField } from "@material-ui/core";
import { useStyles } from './FormStyle'
import { useDispatch } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { addNewDoc, addNewFolder } from "../Redux/action.creator";
import { Alert } from "@material-ui/lab";
import Snackbar from '@material-ui/core/Snackbar';
import {IItem} from "../Type/Type";

 const Form:FC<{items:IItem[]}> = ( { items } ) => {

    const classes = useStyles();
    const dispatch = useDispatch();
     const history = useHistory()
    const { Folderid } = useParams<{Folderid?: string}>();
    const { pathname } = useLocation();
    const pathInArray = pathname.split("/")
    const path = pathInArray.splice(2, pathInArray.length - 1)
    const [folderOpen, setFolderOpen] = useState(false);
    const [docOpen, setDocOpen] = useState(false);
     const [input, setInput] = useState('');

    const addFolder = () => {

        if(input.length === 0) {
            setFolderOpen(true)
        }
        else if (input.length !== 0) {
            if (path.length === 0) {
                const newFolder = {id: Date.now(), label: input, status: false, filter: 'folder', parent: '0'}
                dispatch(addNewFolder(newFolder));
                setInput('')

            } else {
                const newFolder = {id: Date.now(), label: input, status: false, filter: 'folder', parent: Folderid}
                dispatch(addNewFolder(newFolder));
                setInput('')
            }
        }
    }

    const addDoc = () => {
        if(input.length === 0) {
            setDocOpen(true)
        }
        else if (input.length !== 0)
        {
            if (path.length === 0) {
                const newDoc = {id: Date.now(), label: input, status: false, filter: 'doc', parent: '0', text:''}
                dispatch(addNewDoc(newDoc));
                setInput('')

            } else {
                const newDoc = {id: Date.now(), label: input, status: false, filter: 'doc', parent: Folderid, text:''}
                dispatch(addNewDoc(newDoc));
                setInput('')
            }
        }
    }

    const change = (event:React.ChangeEvent<HTMLInputElement>) => {
        setInput(event.currentTarget.value);
    }

    const handleClose = (event:SyntheticEvent, reason:string) => {
        if (reason === 'timeout') {
            return;
        }
        setDocOpen(false);
        setFolderOpen(false);
    };

    return (
        <div className = {classes.container}>

            <Snackbar
                open = {folderOpen}
                onClose = {handleClose}
                anchorOrigin = {{
                    vertical: 'top',
                    horizontal: 'right'
                }}>
                <Alert severity = "error" >
                    Please enter the folder  name
                </Alert>
            </Snackbar>

            <Snackbar
                open = {docOpen}
                onClose = {handleClose}
                anchorOrigin = {{
                    vertical: 'top',
                    horizontal: 'right'
                }}>
                <Alert severity = "error" >
                    Please enter the doc  name
                </Alert>
            </Snackbar>

            <form
                className = {classes.root}
                noValidate autoComplete = "off"
            >
                <TextField
                    id = "outlined-basic"
                    value = {input}
                    variant = "outlined"
                    onChange = {change}
                    autoFocus
                />

                <Button
                    variant = "contained"
                    color = "primary"
                    className = {classes.btn}
                    onClick = {addFolder}>
                    Add Folder
                </Button>

                <Button
                    variant = "contained"
                    color = "primary"
                    className = {classes.btn}
                    onClick = {addDoc}>
                    Add Doc
                </Button>

                <Button
                    variant = "contained"
                    color = "primary"
                    className = {classes.btn}
                    onClick = {() => history.push(`/trash`)}>
                    Trash
                </Button>

            </form>
        </div>
    )
};

 export default Form