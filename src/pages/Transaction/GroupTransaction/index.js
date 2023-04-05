import { useContext, useState } from "react";
import { FormControl, FormLabel, FormErrorMessage, Input, Box, Heading } from "@chakra-ui/react";
import { Button, Container, Modal } from "react-bootstrap";
import firebase from "firebase";
import { useForm } from "react-hook-form";
import { addTransactionResolver } from "../../../utils/validator/addTransactionResolver";
import { db } from "../../../utils/firebase";
import GroupTable from "../../../components/GroupTable";
import { useParams } from "react-router-dom";
// import { DataContext } from "../../Home";
import AddButton from "../../../components/AddButton";
import { DataContext } from "../../../components/Authentication/DataProvider";

const GroupTransaction = () => {
    const { id } = useParams();
    const { currentGroup } = useContext(DataContext);

    const [showAdd, setShowAdd] = useState(false);
    const handleClose = () => setShowAdd(false);
    const handleShowAdd = () => setShowAdd(true);
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
                console.log("Document successfully written!", ref.id, ref.data);
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            })
            .finally(() => handleClose())

    }
    // const handleFilter = () => {

    // }
    console.log(id);



    return (
        <Container>
            <Heading margin={'2%'}>{currentGroup}</Heading>
            <AddButton handler={handleShowAdd} />
            {/* onClick={handleShowAdd} */}
            {/* <Button style={{ position: "fixed", width: "50px", height: "50px", right: "10%", bottom: "10%", borderRadius: "50%", backgroundColor: "cyan", fontSize: "1.5rem" }} >+</Button> */}

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
            <GroupTable id={id} />
        </Container>
    );
};

export default GroupTransaction;
