
import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    container:{
        marginLeft:'600px'
    },
    btn:{
        marginTop:'15px',
        marginLeft:'10px',
        backgroundColor:'#629ece'
    }

}));