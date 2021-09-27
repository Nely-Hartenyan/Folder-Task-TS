import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles ({

    container:{
        marginLeft:'600px'
    },
    btn:{
        marginTop:'15px',
        backgroundColor:'#629ece',
        marginLeft:'10px'
    },
    root: {
        maxWidth: 324,
        marginLeft:'20px',
        display:'inline-block'
    },
    icon:{
        width:'90px',
        height:'90px',
        color:'#648dae'
    },
    cardContent:{
        display:"flex"
    },
    deleteIcon: {
        paddingTop: '3px',
        paddingLeft: '5px',
        fontSize:'30px',
        '&:hover':{
            color:'#8e1d3c'
        }
    },
    restoreIcon: {
        paddingTop: '3px',
        paddingLeft: '5px',
        fontSize:'30px',
        '&:hover':{
            color:'#21b321'
        }
    }

});