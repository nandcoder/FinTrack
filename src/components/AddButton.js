import React from 'react'
import { Button } from 'react-bootstrap';

const AddButton = ({ handler }) => {
    return (
        <Button style={{ position: "fixed", width: "50px", height: "50px", right: "10%", bottom: "10%", borderRadius: "50%", border: '0', backgroundColor: "cyan", fontSize: "1.5rem" }} onClick={handler}>+</Button>
    )
}

export default AddButton;