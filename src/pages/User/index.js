import UserTable from "../../components/UserTable"
import { Container } from "react-bootstrap";
import { Heading } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { db } from "../../utils/firebase";
import { AuthContext } from "../../components/Authentication/AuthProvider";
const User = () => {
    const { user } = useContext(AuthContext);
    const [transactions, setTransactions] = useState([]);
    const [users, setUsers] = useState([{ id: "uniqueId", name: 'user1', amount: 250, status: 'pending' }]);
    const [friends, setFriends] = useState([]);
    const [currPerson, setCurrPerson] = useState({})
    const userBal = [];
    const updateAmount = (transaction, personId) => {
        console.log('calc', transactions);
        const final = {
            id: "6JBeu8XiwymcMFvj2VOZ",
            data: {
                involved: [
                    "7tpEtNLHhURSQ2LmmmngVNwrClp1",
                    "MVAdkWFkFqcQLfZiHl6PBPKqwOu2"
                ],
                status: "pending",
                groupId: "KZoqHaGSVNkuq0QQovow",
                title: "puri trip",
                day: "2",
                groupTitle: "Grp2",
                amount: 500,
                desc: "ssample desc",
                paidBy: {
                    userId: "7tpEtNLHhURSQ2LmmmngVNwrClp1",
                    name: "NAND RAJ",
                    email: "nandraj2001@gmail.com"
                }
            }
        }

        const currBal = () => {
            const temp = final.data.amount / final.data.involved.length;
            if (final.data.paidBy.userId === user.uid) {
                return temp
            } else {
                return 0 - temp;
            }
        }
        // users.forEach((currUser) => {
        //     if (currUser.id === user.uid) {

        //     }
        // })









    }

    const handleNewPerson = (transaction, personId) => {
        setFriends((prevFriends) => [...prevFriends, personId])
        return getUserById(transaction, personId);
    }
    useEffect(() => {
        const arr = [];
        db.collection("transactions")
            .where("involved", "array-contains", user.uid)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // db.collection("users")
                    //     .where("userId", "==", doc.data().paidBy)
                    //     .get()
                    //     .then((querySnapshot) => {
                    //         querySnapshot.forEach((payer) => {
                    //             // payer.data() is never undefined for query payer snapshots
                    //             // console.log(payer.id, " => ", payer.data());
                    //             arr.push(payer.data());

                    //             const id = doc.id;
                    //             const docData = doc.data();
                    //             docData.paidBy = payer.data();
                    //             const finalTransaction = {
                    //                 id,
                    //                 data: docData,
                    //             }
                    //             console.log('final', finalTransaction);
                    //             calculateAmount(finalTransaction)
                    //             // arr.push(finalTransaction);
                    //             // temp.push(finalTransaction);
                    //             setTransactions((prevTransactions) => [...prevTransactions, finalTransaction])
                    //             console.log(users);
                    //         });

                    //     })
                    //     .catch((error) => {
                    //         console.log("Error getting documents: ", error);
                    //     })

                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                    const id = doc.id;
                    const data = doc.data();
                    data.involved.forEach((personId) => {
                        if (personId === user.uid) {

                        }
                        else if (friends.includes(personId)) {
                            updateAmount(data, personId);
                        }
                        else {
                            handleNewPerson(data, personId);
                            // getUserById(person)
                            // // friends.push(person)
                            // setFriends((prevFriends) => [...prevFriends, person])
                        }
                    })
                    // temp.push(doc.data());
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            })
            .finally(() => {
                // setTransactions(arr)
                console.log(transactions);
                // console.log("arr", arr);
                // console.log("temp", temp);
                // setUsers(arr)
            });


    }, [user]);
    const getUserById = async (transaction, id) => {
        let data;
        let temp = []
        return db.collection("users")
            .where("userId", "==", id)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                    temp.push(doc.data());
                    data = doc.data()
                    const amountRequired = transaction.amount / transaction.involved.length;
                    data.amount = amountRequired;
                    setCurrPerson(data);
                    const finalUser = {
                        id: doc.id,
                        data: doc.data(),
                    }
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            })
            .finally(() => { return currPerson })
    }
    // useEffect(() => {
    //     calculateAmount();
    // }, [currPerson]);

    return (
        <Container>
            <Heading margin={'2%'}>Users</Heading>
            {transactions?.map((transaction) => (
                <div>
                    <p>id:- {transaction.id}</p>
                    <p>title:- {transaction.data.title} </p>
                    <p>date:- {transaction.data.day} </p>
                    <p>payer:- {transaction.data.paidBy.name} </p>
                </div>
            ))}
            <UserTable data={users} />
        </Container>
    );
};

export default User;