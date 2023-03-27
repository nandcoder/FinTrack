import UserTable from "../../components/UserTable"
import { Container } from "react-bootstrap";
import { Heading } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { db } from "../../utils/firebase";
import { AuthContext } from "../../components/Authentication/AuthProvider";
const User = () => {
    const { user } = useContext(AuthContext);
    const [transactions, setTransactions] = useState([]);
    const [users, setUsers] = useState([]);
    useEffect(() => {
        let temp = [];
        const arr = [];
        db.collection("transactions")
            .where("involved", "array-contains", user.uid)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    db.collection("users")
                        .where("userId", "==", doc.data().paidBy)
                        .get()
                        .then((querySnapshot) => {
                            querySnapshot.forEach((payer) => {
                                // payer.data() is never undefined for query payer snapshots
                                // console.log(payer.id, " => ", payer.data());
                                arr.push(payer.data());

                                const id = doc.id;
                                const docData = doc.data();
                                docData.paidBy = payer.data();
                                const finalTransaction = {
                                    id,
                                    data: docData,
                                }
                                arr.push(finalTransaction);
                            });

                        })
                        .catch((error) => {
                            console.log("Error getting documents: ", error);
                        })

                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                    temp.push(doc.data());
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            })
            .finally(() => {
                setTransactions(arr)
                console.log(arr);
                // setUsers(arr)
            });


        // const getUserById=(id)=>{
        //         db.collection("users")
        //         .where("userId", "==", id)
        //         .get()
        //         .then((querySnapshot) => {
        //             querySnapshot.forEach((doc) => {
        //                 // doc.data() is never undefined for query doc snapshots
        //                 console.log(doc.id, " => ", doc.data());
        //                 temp.push(doc.data());
        //             });
        //         })
        //         .catch((error) => {
        //             console.log("Error getting documents: ", error);
        //         })
        //         .finally(() => setTransactions(temp))
        //     }
    }, [user]);

    return (
        <Container>
            <Heading margin={'2%'}>Users</Heading>
            <UserTable />
        </Container>
    );
};

export default User;