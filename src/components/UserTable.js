import { useContext, useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
// import data from '../assets/UserData';
import { AuthContext } from './Authentication/AuthProvider';
import { Badge, Button, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { LaunchRounded } from '@mui/icons-material';

function UserTable({ users, transactions }) {
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(true)
    const [userData, setUserData] = useState({});
    const [transactionData, setTransactionData] = useState([]);
    // const [balances, setBalances] = useState([]);
    useEffect(() => {
        const tempTC = transactions;
        const tempUSR = users;
        tempTC.forEach(transaction => {
            transaction.data.involved.forEach((personId) => {
                console.log(tempUSR[personId]);
                if (personId === user.uid) {
                }
                else {
                    if (transaction.data.paidBy !== undefined) {
                        if (transaction.data.paidBy === user.uid) {
                            tempUSR[personId].amount += transaction.data.amount / transaction.data.involved.length
                        } else {
                            tempUSR[personId].amount -= transaction.data.amount / transaction.data.involved.length
                        }
                    }
                }
            })
        })
        setTransactionData(tempTC);
        setUserData(tempUSR);
        setLoading(false)
    }, [user, transactions, users]);
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
                {!loading && transactionData.length !== 0 && Object.keys(userData)?.map((row, key) => {
                    if (userData[row].userId !== user.uid)
                        return (
                            <tr key={key}>
                                <td>{userData[row].name}</td>
                                <td>
                                    {userData[row].amount >= 0 ? (
                                        <Badge colorScheme='green'>Lent</Badge>
                                    ) : (
                                        <Badge colorScheme='red'>Borrowed</Badge>
                                    )}
                                </td>
                                <td>
                                    {userData[row].amount >= 0 ? (
                                        <Text as={'b'} color='green'>{userData[row].amount}</Text>
                                    ) : (
                                        <Text as={'b'} color='red'>{userData[row].amount}</Text>
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
                    else return null
                })}
            </tbody>
        </Table>
    );
}

export default UserTable;