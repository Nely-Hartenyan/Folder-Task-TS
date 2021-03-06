import React, {FC, SyntheticEvent, useState} from "react";
import {Button} from "@material-ui/core";
import {useStyles} from "../Form/FormStyle";
import {useHistory, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import {Alert} from "@material-ui/lab";
import {IItem} from "../Type/Type";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import {addDocText} from "../../Toolkit/toolkitReducer";
import {TextProps} from "./Type";


const TextItem:FC<TextProps> = ({items}) => {

    const {Docid} = useParams<{Docid?: string}>()
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const [input, setInput] = useState('');
    const [text, setText] = useState(false);

    const item = items.find((el) => el.id === Number(Docid))

    const changeInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(event.currentTarget.value);
    }

    const addText = () => {
        const newDocText:IItem = {text: input, id: Number(Docid)}
        dispatch(addDocText(newDocText));
        setText(true)
    }


    const handleClose = (event: SyntheticEvent, reason: string) => {
        if (reason === 'timeout') {
            return;
        }
        setText(false);
    };

    return (
        <div>
            <Snackbar
                open = {text}
                onClose = {handleClose}
                anchorOrigin = {{
                    vertical: 'top',
                    horizontal: 'right'
                }}>
                <Alert severity = "success">
                    Text added
                </Alert>
            </Snackbar>
            <ArrowBackIcon onClick = { () => history.goBack()}/>

            <div>
                <textarea
                     id = ""
                     cols = {100}
                     rows = {20}
                     defaultValue = {item?.text}
                     onChange = {changeInput}
                />
            </div>

            <Button
                variant = "contained"
                color = "primary"
                className = {classes.btn}
                onClick = {addText}
            >
                Add Text
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

export default TextItem