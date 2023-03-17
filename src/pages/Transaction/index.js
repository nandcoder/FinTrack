import { useState } from "react";
import { Button, Container, Modal } from "react-bootstrap";
import TransactionTable from "../../components/TransactionTable";

const Transaction = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const addTransaction = () => {


        handleClose()
    }


    return (
        <Container>
            <h1>Transactions</h1>
            <Button onClick={handleShow}>+</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={addTransaction}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
            <TransactionTable />
        </Container>
    );
};

export default Transaction;
