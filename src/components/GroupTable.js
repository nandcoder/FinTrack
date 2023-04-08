import Table from 'react-bootstrap/Table';
// import Badge from 'react-bootstrap/Badge';
// import data from '../assets/TransactionData';
import { db } from '../utils/firebase';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from './Authentication/AuthProvider';
import { Badge, IconButton } from '@chakra-ui/react';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
// import getUserById from '../assets/queries';

// function descendingComparator(a, b, orderBy) {
//     if (b[orderBy] < a[orderBy]) {f
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
function GroupTable({ id }) {
    const { user } = useContext(AuthContext);
    const [transactions, setTransactions] = useState([]);


    useEffect(() => {
        let temp = [];
        db.collection("transactions")
            .where("involved", "array-contains", user.uid)
            .where("groupId", "==", id)
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
                    //         });

                    //     })
                    //     .catch((error) => {
                    //         console.log("Error getting documents: ", error);
                    //     })

                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                    temp.push({ id: doc.id, data: doc.data() });
                    // temp.push(doc.data());
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            })
            .finally(() => {
                setTransactions(temp)
                console.log(temp);
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
    }, [user, id]);
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

                {transactions?.map((transaction) => (
                    <tr key={transaction.id}>
                        <td><div className="d-flex align-items-center">



                            <div className="ms-3">
                                <p className="fw-bold mb-1">User 1</p>
                                <p className="text-muted mb-0">928338479</p>
                            </div>


                        </div></td>
                        <td><p className="fw-bold mb-1">{transaction.data.category}</p>
                            <p className="text-muted mb-0">{transaction.data.desc}</p>
                        </td>
                        <td>{transaction.data.day}</td>
                        <td>{transaction.data.date}</td>
                        <td>

                            {transaction.data.status !== 'pending' ? (
                                <div>
                                    <Badge variant='solid' colorScheme='green'>
                                        {transaction.data.status}
                                    </Badge>
                                </div>

                            ) : (
                                <div>
                                    <Badge variant='outline' colorScheme='red'>
                                        {transaction.data.status}
                                    </Badge>
                                </div>
                            )}

                        </td>

                        <td>{transaction.data.amount}</td>

                        <td>
                            <IconButton
                                variant='outline'
                                colorScheme='green'
                                aria-label='Send email'
                                icon={<CheckCircleOutlineRoundedIcon />}
                            />
                            {" "}
                            <IconButton
                                variant='outline'
                                colorScheme='red'
                                aria-label='Send email'
                                icon={<DeleteIcon />}
                            />
                            {/* <button type="button" className="btn btn-primary btn-sm">Edit</button> */}

                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default GroupTable;