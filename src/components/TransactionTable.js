import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';
// import data from '../assets/TransactionData';
import { db } from '../utils/firebase';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from './Authentication/AuthProvider';
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
function StripedRowExample(props) {
    const { user } = useContext(AuthContext);
    // const [request, setRequest] = useState(true);
    const [transactions, setTransactions] = useState([]);
    // const [users, setUsers] = useState([]);


    useEffect(() => {
        let temp = [];
        let arr = [];
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
                setTransactions(temp)
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

                {transactions?.map((transaction, key) => (
                    <tr key={key}>
                        <td><div className="d-flex align-items-center">



                            <div className="ms-3">
                                <p className="fw-bold mb-1">User 1</p>
                                <p className="text-muted mb-0">928338479</p>
                            </div>


                        </div></td>
                        <td><p className="fw-bold mb-1">{transaction.category}</p>
                            <p className="text-muted mb-0">{transaction.desc}</p>
                        </td>
                        <td>{transaction.day}</td>
                        <td>{transaction.date}</td>
                        <td>

                            {transaction.paidBy === user.uid ? (
                                <div>
                                    <Badge pill bg="success">
                                        {transaction.status}
                                    </Badge>
                                </div>

                            ) : (
                                <div>
                                    <Badge pill bg="secondary">
                                        {transaction.status}
                                    </Badge>
                                </div>
                            )}

                        </td>

                        <td>{transaction.amount}</td>

                        <td>
                            <button type="button" className="btn btn-primary btn-sm">Edit</button>

                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default StripedRowExample;