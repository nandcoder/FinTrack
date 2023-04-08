import React from 'react'
import { Button } from 'react-bootstrap';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

const AddButton = ({ handler }) => {
    return (
        <Button style={{ position: "fixed", width: "50px", height: "50px", right: "5%", bottom: "15vh", borderRadius: "50%", border: '0', backgroundColor: "black", color: 'white' }} onClick={handler}><AddRoundedIcon /> </Button>
    )
}

export default AddButton;