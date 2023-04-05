import { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Heading } from "@chakra-ui/react";
import { AuthContext } from "../../components/Authentication/AuthProvider";
// import { db } from "../../utils/firebase";
import UserTable from "../../components/UserTable"
import Loader from "../../components/Loader";
import { DataContext } from "../../components/Authentication/DataProvider";
const User = () => {
    const { user } = useContext(AuthContext);
    const { users, transactions } = useContext(DataContext);
    const [transactionsData, setTransactionsData] = useState([]);
    const [usersData, setUsersData] = useState({});
    // const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (transactions.length !== 0 && Object.keys(users).length !== 0) {
            setTransactionsData(transactions)
            setUsersData(users)
            setLoading(false);
        }
    }, [user, users, transactions]);
    return (
        <Container>
            <Heading margin={'2%'}>Users</Heading>
            {loading && <Loader />}
            {!loading && transactionsData.length !== 0 && Object.keys(usersData).length !== 0 && (
                <UserTable users={usersData} transactions={transactionsData} />
            )}
        </Container>
    );
};

export default User;