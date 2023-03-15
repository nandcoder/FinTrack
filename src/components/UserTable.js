import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import data from '../assets/UserData';

function StripedRowExample() {
    const [userData, setUserData] = useState([])
    const [request, setRequest] = useState(true)
    // const [data, setData] = useState([]);
    useEffect(() => {
        // const fetchApi = async () => {
        //     // const URL = "https://opentdb.com/api.php?amount=10&&type=multiple";
        //     const endpoint = `${process.env.BACKEND_URL}/users`
        //     // const endpoint = `http://localhost:3030/users`
        //     const response = await fetch(endpoint);
        //     console.log('response:', response)
        //     const resJson = await response.json();
        //     console.log(resJson.data);
        //     setUserData(resJson.data);
        // };
        // fetchApi();
    }, [request]);
    // useEffect(() => {
    //     //   fetch('https://mywebsite.example/endpoint/', {
    //     //   method: 'POST',
    //     //   headers: {
    //     //     'Accept': 'application/json',
    //     //     'Content-Type': 'application/json',
    //     //   },
    //     //   body: JSON.stringify({
    //     //     firstParam: 'yourValue',
    //     //     secondParam: 'yourOtherValue',
    //     //   })
    //     // })
    // }, [request])
    return (
        <Table striped>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th>Amount</th>
                </tr>
            </thead>
            <tbody>
                {data.map((row) => (
                    <tr>
                        <td>{row.name}</td>
                        <td>{row.date}</td>
                        <td>{row.category}</td>
                        <td>{row.status}</td>
                        <td>{row.amount}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default StripedRowExample;