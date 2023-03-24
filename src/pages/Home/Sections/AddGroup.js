import React, { useContext, useState } from 'react'
import { FormControl, FormLabel, FormErrorMessage, Input, Box } from "@chakra-ui/react";
import { Badge, Stack } from '@chakra-ui/react'
import { Button, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { db } from '../../../utils/firebase'
import { addGroupResolver } from '../../../utils/validator/addGroupResolver';
import { AuthContext } from '../../../components/Authentication/AuthProvider';

const AddGroup = ({ show, handleClose }) => {
    const { user } = useContext(AuthContext);
    // const [members, setMembers] = useState([]);
    const [currEmail, setCurrEmail] = useState('');
    const [mails, setMails] = useState([{ email: user.email, name: "NRJ", userId: user.uid }]);
    const handleChange = (event) => {
        setCurrEmail(event.target.value)
    };
    const arr = [];

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
        trigger,
        setError,
        // clearErrors,
    } = useForm({ resolver: addGroupResolver });

    // const handleChange = (event) => {
    //     console.log(event.target.value);
    //     setCurrEmail(event.target.value)
    //     console.log(currEmail)
    // }

    const getUserByEmail = () => {
        db.collection("users")
            .where("email", "==", currEmail)
            .get()
            .then((querySnapshot) => {
                if (querySnapshot.size === 0) {
                    setError('involved', { type: 'custom', message: 'Account not found' });
                }
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                    // setMembers([...members, doc.data()])
                    arr.push(doc.data());
                    setMails(prevMails => [...prevMails, doc.data()])
                    // console.log(arr);
                });

            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            })
            .finally(() => {
                console.log("mails", mails)
            })
    }

    const addGroup = ({ title, desc, usersInvolved }) => {
        console.log(title, usersInvolved);
        const firstLetter = title.charAt(0);
        const firstLetterCap = firstLetter.toUpperCase();
        const remainingLetters = title.slice(1);
        const finalTitle = firstLetterCap + remainingLetters;
        const arr = [];
        mails.forEach((mail) => {
            arr.push(mail.userId)
        })
        const finalDoc = {
            title: finalTitle,
            desc,
            // amount,
            // paidBy: payer,
            members: arr,
        }

        db.collection("groups").add(finalDoc)
            .then((ref) => {
                console.log("Document successfully written!", ref.id, ref.data);
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            })
            .finally(() => handleClose())

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



                    <FormControl mt="2" isInvalid={errors.involved}>
                        <FormLabel htmlFor="involved">Add members to the group</FormLabel>
                        {/* <Input
                            type="email"
                            name="involved"
                            value={currEmail}
                            onChange={handleChange}
                            placeholder="Enter email to add member"
                            {...register("involved")}
                        /> 
                        <input
                            value={currEmail}
                            onChange={handleChange}
                            type="email"
                            name="involved"
                            placeholder="Here is a sample placeholder"
                            size="sm"
                            {...register('involved')}
                        /> 
                        
                        <input type="text" name="desc" placeholder="Add a note" id="field-4" class="chakra-input css-1c6j008" autocomplete="off"></input>*/}
                        <input
                            type={"email"}
                            name="involved"
                            id="field-5"
                            {...register('involved')}
                            onChange={handleChange}
                            className="chakra-input css-1c6j008"
                            value={currEmail}
                            placeholder={"Enter email to add"}
                        />
                        <Button onClick={() => {
                            trigger("involved")
                                .then(() => getUserByEmail())
                                .catch((err) => console.log("Error: ", err))
                        }}>+</Button>
                        <FormErrorMessage>
                            {errors.involved && errors.involved.message}
                        </FormErrorMessage>
                        <Stack direction='row'>
                            <Badge>Default</Badge>
                            <Badge colorScheme='green'>Success</Badge>
                            <Badge colorScheme='red'>Removed</Badge>
                            <Badge colorScheme='purple'>New</Badge>
                        </Stack>
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