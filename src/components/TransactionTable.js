import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';
import data from '../assets/TransactionData';
import { db } from '../utils/firebase';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from './Authentication/AuthProvider';

function StripedRowExample() {
    const { user } = useContext(AuthContext);
    const [request, setRequest] = useState(true);
    const [transctions, setTransctions] = useState([]);


    useEffect(() => {
        let temp = [];
        db.collection("transactions")
            .where("involved", "array-contains", user.uid)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                    temp.push(doc.data());
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            })
            .finally(() => setTransctions(temp))
        console.log(user.uid);
        // console.log(data);
    }, [request]);


    return (





        <Table class="table align-middle mb-0 bg-white">


            <thead class="bg-light" >
                <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Amount</th>
                    <th>Actions</th>

                </tr>
            </thead>
            <tbody>

                {transctions?.map((row) => (
                    <tr>
                        <td><div class="d-flex align-items-center">



                            <div class="ms-3">
                                <p class="fw-bold mb-1">{row.name}</p>
                                <p class="text-muted mb-0">928338479</p>
                            </div>


                        </div></td>
                        <td><p class="fw-bold mb-1">{row.category}</p>
                            <p class="text-muted mb-0">description</p>
                        </td>
                        <td>{row.date}</td>
                        <td>

                            {row.paidBy === user.uid ? (
                                <div>
                                    <Badge pill bg="success">
                                        {row.status} Pending
                                    </Badge>
                                </div>

                            ) : (
                                <div>
                                    <Badge pill bg="secondary">
                                        {row.status} Pending
                                    </Badge>
                                </div>
                            )}

                        </td>

                        <td>{row.amount}</td>

                        <td>
                            <button type="button" class="btn btn-primary btn-sm">Edit</button>

                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default StripedRowExample;