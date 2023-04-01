import { useContext, useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
// import data from '../assets/UserData';
import { db } from '../utils/firebase';
import { AuthContext } from './Authentication/AuthProvider';

function UserTable() {
    const { user } = useContext(AuthContext);
    // const [userData, setUserData] = useState([])
    // const [request, setRequest] = useState(true)
    const [data, setData] = useState([]);
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
            .finally(() => {
                setData(temp);
            })
    }, [user]);
    return (
        <Table striped>
            <thead>
                <tr>
                    <th>Name</th>
                    {/* <th>Date</th> */}
                    <th>Category</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Details</th>
                </tr>
            </thead>
            <tbody>
                {data.map((row, key) => (
                    <tr key={key}>
                        <td>{row.name}</td>
                        {/* <td>{row.date}</td> */}
                        <td>{row.category}</td>
                        <td>{row.amount}</td>
                        <td>{row.status}</td>
                        <td>{row.details}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default UserTable;