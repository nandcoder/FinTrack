import { useState } from "react";
import { FormControl, FormLabel, FormErrorMessage, Input, Text, Link, Box } from "@chakra-ui/react";
import { Button, Container, Modal } from "react-bootstrap";
import TransactionTable from "../../components/TransactionTable";
import { useForm } from "react-hook-form";
import { addTransactionResolver } from "../../utils/validator/addTransactionResolver";
import { db } from "../../utils/firebase";

const Transaction = () => {
    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const onSubmit = () => {
    }
    const handleClose = () => setShowAdd(false);
    const handleShowAdd = () => setShowAdd(true);
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
        setError,
        clearErrors,
    } = useForm({ resolver: addTransactionResolver });
    const addTransaction = ({ title, desc, amount, payer, involved }) => {
        console.log(title, desc, amount, payer, involved);

        handleClose()

    }



    return (
        <Container>
            <h1>Transactions</h1>
            <Button onClick={handleShowAdd}>+</Button>
            <Modal show={showAdd} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Transaction</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit(addTransaction)}>
                        <FormControl isInvalid={errors.title}>
                            <FormLabel htmlFor="title">Title</FormLabel>
                            <Input
                                type="text"
                                name="title"
                                placeholder="Enter Title"
                                {...register("title")}
                            />
                            <FormErrorMessage>
                                {errors.title && errors.title.message}
                            </FormErrorMessage>
                        </FormControl>

                        <FormControl marginTop="2" isInvalid={errors.desc}>
                            <FormLabel htmlFor="desc">Description</FormLabel>
                            <Input
                                type="text"
                                name="desc"
                                placeholder="Add a note"
                                {...register("desc")}
                            />
                            <FormErrorMessage>
                                {errors.desc && errors.desc.message}
                            </FormErrorMessage>
                        </FormControl>

                        <FormControl marginTop="2" isInvalid={errors.amount}>
                            <FormLabel htmlFor="amount">Amount</FormLabel>
                            <Input
                                type="number"
                                name="amount"
                                placeholder="Enter Amount"
                                {...register("amount")}
                            />
                            <FormErrorMessage>
                                {errors.amount && errors.amount.message}
                            </FormErrorMessage>
                        </FormControl>

                        <FormControl mt="2" isInvalid={errors.payer}>
                            <FormLabel htmlFor="payer">Paid By:</FormLabel>
                            <Input
                                type="email"
                                name="payer"
                                placeholder="Enter payers' email"
                                {...register("payer")}
                            />
                            <FormErrorMessage>
                                {errors.payer && errors.payer.message}
                            </FormErrorMessage>
                        </FormControl>

                        <FormControl mt="2" isInvalid={errors.involved}>
                            <FormLabel htmlFor="involved">Add user involved</FormLabel>
                            <Input
                                type="email"
                                name="involved"
                                placeholder="Enter email of user involved"
                                {...register("involved")}
                            />
                            <FormErrorMessage>
                                {errors.involved && errors.involved.message}
                            </FormErrorMessage>
                        </FormControl>

                        <Box mt="5" color="red.500">
                            {errors.API_ERROR && errors.API_ERROR.message}
                        </Box>
                        <Button
                            isLoading={isSubmitting}
                            // onClick={addInvolved}
                            mt={4}
                            variant="info"
                            type="submit"
                            w="100%"
                        >
                            Add
                        </Button>

                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button type="submit" variant="primary">
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
            <TransactionTable />
        </Container>
    );
};

export default Transaction;
