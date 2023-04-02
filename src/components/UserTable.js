import { useContext, useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
// import data from '../assets/UserData';
import { db } from '../utils/firebase';
import { AuthContext } from './Authentication/AuthProvider';
import { Badge, Button, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { LaunchRounded } from '@mui/icons-material';

function UserTable({ users, transactions }) {
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(true)
    // const [balances, setBalances] = useState([]);
    useEffect(() => {
        transactions.forEach(transaction => {
            transaction.data.involved.forEach((personId) => {
                console.log(users[personId]);
                if (personId === user.uid) {
                }
                else {
                    if (transaction.data.paidBy === user.uid) {
                        users[personId].amount += transaction.data.amount / transaction.data.involved.length
                    } else {
                        users[personId].amount -= transaction.data.amount / transaction.data.involved.length
                    }
                }
            })
        })
        setLoading(false)
    }, [user]);
    return (
        <Table style={{ fontSize: '1.5rem' }} striped>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Amount</th>
                    <th>Details</th>
                </tr>
            </thead>
            <tbody>
                {!loading && Object.keys(users)?.map((row, key) => {
                    console.log("ROW", users[row])
                    if (users[row].userId !== user.uid) {
                        const red = {
                            50: '#ffebee', 100: '#ffcdd2', 200: '#ef9a9a', 300: '#e57373', 400: '#ef5350', 500: '#f44336', 600: '#e53935', 700: '#d32f2f', 800: '#c62828', 900: '#b71c1c', A100: '#ff8a80', A200: '#ff5252', A400: '#ff1744', A700: '#d50000',
                        }
                        return (
                            <tr key={key}>
                                <td>{users[row].name}</td>
                                {/* <td>{users[row].date}</td> */}
                                <td>
                                    {users[row].amount >= 0 ? (
                                        <Badge colorScheme='green'>Lent</Badge>
                                    ) : (
                                        <Badge colorScheme='red'>Borrowed</Badge>
                                    )}
                                </td>
                                <td>
                                    {users[row].amount >= 0 ? (
                                        <Text as={'b'} color='green'>{users[row].amount}</Text>
                                    ) : (
                                        <Text as={'b'} color='red'>{users[row].amount}</Text>
                                    )}
                                </td>
                                <td>
                                    <Link to={`/transaction/user/${row}`}>
                                        <Button colorScheme='messenger'>
                                            Details
                                            <LaunchRounded />
                                        </Button>
                                    </Link>
                                </td>
                            </tr>
                        )
                    }
                })}
            </tbody>
        </Table>
    );
}

export default UserTable;