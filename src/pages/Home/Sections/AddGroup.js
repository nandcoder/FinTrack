import React, { useState } from 'react'
import firebase from "firebase";
import { FormControl, FormLabel, FormErrorMessage, Input, Box } from "@chakra-ui/react";
import { Button, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { db } from '../../../utils/firebase'
import { addGroupResolver } from '../../../utils/validator/addGroupResolver';

const AddGroup = ({ show, handleClose }) => {
    const [members, setMembers] = useState([]);
    const [currEmail, setCurrEmail] = useState('');
    const arr = [];

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
        // setError,
        // clearErrors,
    } = useForm({ resolver: addGroupResolver });

    const handleChange = (event) => {
        console.log(event);
        setCurrEmail(event.target.email.value)
        console.log(currEmail)
    }

    const addGroup = ({ title, usersInvolved }) => {
        console.log(title, usersInvolved);
        const firstLetter = title.charAt(0);
        const firstLetterCap = firstLetter.toUpperCase();
        const remainingLetters = title.slice(1);
        const finalTitle = firstLetterCap + remainingLetters;
        const finalDoc = {
            datetime: firebase.database.ServerValue.TIMESTAMP,
            title: finalTitle,
            // desc,
            // amount,
            // paidBy: payer,
            usersInvolved,
        }

        // db.collection("groups").add(finalDoc)
        //     .then((ref) => {
        //         console.log("Document successfully written!", ref.id, ref.data);
        //     })
        //     .catch((error) => {
        //         console.error("Error writing document: ", error);
        //     })
        //     .finally(() => handleClose())

    }
    const getUserByEmail = () => {
        db.collection("users")
            .where("email", "==", currEmail)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                    setMembers([...members, doc.data()])
                    arr.push(doc.data());
                });

            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            })
    }


    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Group</Modal.Title>
            </Modal.Header>
            <form onSubmit={handleSubmit(addGroup)}>
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

                    <FormControl mt="2" isInvalid={errors.involved}>
                        <FormLabel htmlFor="involved">Add members to the group</FormLabel>
                        <Input
                            type="email"
                            name="involved"
                            onChange={handleChange}
                            placeholder="Enter email to add member"
                            {...register("involved")}
                        />
                        <Button onClick={getUserByEmail}>+</Button>
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
    )
}

export default AddGroup;