import UserTable from "../../components/UserTable"
import { Container } from "react-bootstrap";
const User = () => {

    return (
        <Container>
            <h1>Users</h1>
            <UserTable />
        </Container>
    );
};

export default User;