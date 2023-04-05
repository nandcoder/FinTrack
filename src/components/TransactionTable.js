import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';
// import data from '../assets/TransactionData';
// import { db } from '../utils/firebase';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from './Authentication/AuthProvider';
import { DataContext } from './Authentication/DataProvider';
import { Avatar, AvatarGroup } from '@chakra-ui/react';
// import Loader from './Loader';
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
    const { transactions, users } = useContext(DataContext)
    // const [request, setRequest] = useState(true);
    const [transactionData, setTransactionData] = useState([]);
    // const [loading, setLoading] = useState(true);
    // const [users, setUsers] = useState([]);


    useEffect(() => {
        // let temp = [];
        const arr = [];
        if ((transactions.length !== 0) && (Object.keys(users).length !== 0)) {
            transactions.forEach(transaction => {
                if (props.id) {
                    if (transaction.data.involved.includes(props.id)) {
                        const temp = transaction;
                        temp.data.paidBy = users[temp.data.paidBy]
                        arr.push(temp);
                    }
                } else {
                    const temp = transaction;
                    temp.data.paidBy = users[temp.data.paidBy]
                    arr.push(temp);
                }
            });
            setTransactionData(arr);
            // setLoading(false)
        }


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
    }, [user, users, transactions, props.id]);
    // const getUserName = (id) => {
    //     console.log(users);
    //     // console.log(payer);
    //     return 'payer';
    // }
    console.log(transactionData)

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

                {transactionData.length !== 0 && transactionData.map((transaction, key) => (
                    <tr key={key}>
                        <td><div className="d-flex align-items-center">



                            <div className="ms-3">
                                <p className="fw-bold mb-1">{transaction.data.groupTitle}</p>
                                <p className="text-muted mb-0">
                                    {transaction.data.paidBy && (transaction.data.paidBy.userId === user.uid) ? "YOU Paid" : `Paid by: ${transaction.data.paidBy && transaction.data.paidBy.name}`}
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

                            {transaction.data.paidBy && transaction.data.paidBy.userId === user.uid ? (
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
                            <div>
                                <AvatarGroup size='sm' max={5}>
                                    {transaction.data.involved.map((member, key) => (
                                        <Avatar key={key} name={users[member].name} src='' />
                                    ))}
                                </AvatarGroup>
                            </div>

                        </td>

                        <td>
                            <button type="button" className="btn btn-primary btn-sm">Edit</button>
                        </td>
                    </tr>
                )
                )}
            </tbody>
        </Table>
    );
}

export default TransactionTable;