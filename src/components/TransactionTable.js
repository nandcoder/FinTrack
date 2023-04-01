import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';
// import data from '../assets/TransactionData';
import { db } from '../utils/firebase';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from './Authentication/AuthProvider';
import { Avatar, AvatarGroup } from '@chakra-ui/react';
// import getUserById from '../assets/queries';

// function descendingComparator(a, b, orderBy) {
//     if (b[orderBy] < a[orderBy]) {
//         return -1;
//     }
//     if (b[orderBy] > a[orderBy]) {
//         return 1;
//     }
//     return 0;
// }
// function getComparator(order, orderBy) {
//     return order === 'desc'
//         ? (a, b) => descendingComparator(a, b, orderBy)
//         : (a, b) => -descendingComparator(a, b, orderBy);
// }
// function stableSort(array, comparator) {
//     const stabilizedThis = array.map((el, index) => [el, index]);
//     stabilizedThis.sort((a, b) => {
//         const order = comparator(a[0], b[0]);
//         if (order !== 0) {
//             return order;
//         }
//         return a[1] - b[1];
//     });
//     return stabilizedThis.map((el) => el[0]);
// }
function TransactionTable(props) {
    const { user } = useContext(AuthContext);
    // const [request, setRequest] = useState(true);
    const [transactions, setTransactions] = useState([]);
    // const [users, setUsers] = useState([]);


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
                                console.log('final', finalTransaction);
                                // calculateAmount(finalTransaction)
                                // arr.push(finalTransaction);
                                // temp.push(finalTransaction);
                                setTransactions((prevTransactions) => [...prevTransactions, finalTransaction])
                                // console.log(users);
                            });

                        })
                        .catch((error) => {
                            console.log("Error getting documents: ", error);
                        })


                    // db.collection("users")
                    //     .where("userId", "==", doc.data().paidBy)
                    //     .get()
                    //     .then((querySnapshot) => {
                    //         querySnapshot.forEach((payer) => {
                    //             // payer.data() is never undefined for query payer snapshots
                    //             // console.log(payer.id, " => ", payer.data());
                    //             arr.push(payer.data());
                    //         });

                    //     })
                    //     .catch((error) => {
                    //         console.log("Error getting documents: ", error);
                    //     })

                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                    temp.push(doc.data());
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            })
            .finally(() => {
                // setTransactions(temp)
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
    // const getUserName = (id) => {
    //     console.log(users);
    //     // console.log(payer);
    //     return 'payer';
    // }


    return (





        <Table className="table align-middle mb-0 bg-white">


            <thead className="bg-light" >
                <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Day</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Amount</th>
                    <th>Actions</th>

                </tr>
            </thead>
            <tbody>

                {transactions?.map((transaction, key) => {
                    let payer = 'YOU';
                    if (transaction.data.paidBy.userId !== user.uid) {
                        payer = transaction.data.paidBy.name;
                    }
                    return (
                        <tr key={key}>
                            <td><div className="d-flex align-items-center">



                                <div className="ms-3">
                                    <p className="fw-bold mb-1">{transaction.data.groupTitle}</p>
                                    <p className="text-muted mb-0">
                                        {transaction.data.paidBy.userId === user.uid ? "YOU Paid" : `Paid by: ${transaction.data.paidBy.name}`}
                                    </p>
                                </div>


                            </div></td>
                            <td>
                                <p className="fw-bold mb-1">{transaction.data.category}</p>
                                <p className="text-muted mb-0">{transaction.data.desc}</p>
                            </td>
                            <td>{transaction.data.day}</td>
                            <td>{transaction.data.date}</td>
                            <td>

                                {transaction.data.paidBy.userId === user.uid ? (
                                    <div>
                                        <Badge pill bg="success">
                                            {transaction.data.status}
                                        </Badge>
                                    </div>

                                ) : (
                                    <div>
                                        <Badge style={{ background: 'red' }} pill bg="secondary">
                                            {transaction.data.status}
                                        </Badge>
                                    </div>
                                )}

                            </td>

                            <td style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', alignContent: 'center', justifyContent: 'center' }}>

                                <p>{transaction.data.amount}</p>
                                <p>
                                    <AvatarGroup size='sm' max={5}>
                                        {transaction.data.involved.map((member, key) => (
                                            <Avatar key={key} name={member.name} src='' />
                                        ))}
                                    </AvatarGroup>
                                </p>

                            </td>

                            <td>
                                <button type="button" className="btn btn-primary btn-sm">Edit</button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    );
}

export default TransactionTable;