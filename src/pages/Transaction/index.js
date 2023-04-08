import { useContext, useState } from "react";
import { FormControl, FormLabel, FormErrorMessage, Input, Box, Heading, useToast } from "@chakra-ui/react";
import { Button, Container, Modal } from "react-bootstrap";
import firebase from "firebase";
import TransactionTable from "../../components/TransactionTable";
import { useForm } from "react-hook-form";
import { addTransactionResolver } from "../../utils/validator/addTransactionResolver";
import { db } from "../../utils/firebase";
import FilterListIcon from '@mui/icons-material/FilterList';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { DataContext } from "../../components/Authentication/DataProvider";
import Loader from "../../components/Loader";

const Transaction = () => {
    const { transactions, users, requestTransactions, setRequestTransactions } = useContext(DataContext)
    const [showAdd, setShowAdd] = useState(false);
    const handleClose = () => setShowAdd(false);
    const handleShowAdd = () => setShowAdd(true);
    const toast = useToast();
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
        // setError,
        // clearErrors,
    } = useForm({ resolver: addTransactionResolver });
    const addTransaction = ({ title, desc, amount, payer, involved }) => {
        console.log(title, desc, amount, payer, involved);
        const firstLetter = title.charAt(0);
        const firstLetterCap = firstLetter.toUpperCase();
        const remainingLetters = title.slice(1);
        const finalTitle = firstLetterCap + remainingLetters
        const finalDoc = {
            datetime: firebase.database.ServerValue.TIMESTAMP,
            title: finalTitle,
            desc,
            amount,
            paidBy: payer,
            involved,
        }

        db.collection("transactions").add(finalDoc)
            .then((ref) => {
                toast({
                    title: 'top-right toast',
                    position: 'top-right',
                    isClosable: true,
                    render: () => (
                        <Box color='white' p={3} bg='blue.500'>
                            Transaction added successfully!!
                        </Box>
                    ),
                })
                console.log("Document successfully written!", ref.id, ref.data);
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            })
            .finally(() => {
                handleClose()
                setRequestTransactions(!requestTransactions)
            })

    }
    const handleFilter = () => {

    }



    return (
        <Container style={{ width: "80%" }}>
            <Heading display={"inline-block"} margin={"2%"}>Transactions</Heading>
            <Button variant="dark" style={{ float: "right", margin: "10px", borderRadius: "50%", backgroundColor: "black", height: "50px", width: "50px", color: '#04bef8' }} onClick={handleShowAdd}><AddRoundedIcon /></Button>
            <Button variant="dark" style={{ float: "right", margin: "10px", borderRadius: "50%", backgroundColor: "black", height: "50px", width: "50px", color: '#04bef8' }} onClick={handleFilter}><FilterListIcon /></Button>
            <br />
            <Modal show={showAdd} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Transaction</Modal.Title>
                </Modal.Header>
                <form onSubmit={handleSubmit(addTransaction)}>
                    <Modal.Body>
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
                        {/* <Button
                            isLoading={isSubmitting}
                            // onClick={addInvolved}
                            mt={4}
                            variant="info"
                            type="submit"
                            w="100%"
                        >
                            Add
                        </Button> */}

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button isLoading={isSubmitting} type="submit" variant="success">
                            Submit
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>

            {transactions.length === 0 || Object.keys(users).length === 0 ? <Loader /> : <TransactionTable />}
        </Container>
    );
};

export default Transaction;
