import UserTable from "../../components/UserTable"
import { Container } from "react-bootstrap";
import { Heading } from "@chakra-ui/react";
const User = () => {

    return (
        <Container>
            <Heading margin={'2%'}>Users</Heading>
            <UserTable />
        </Container>
    );
};

export default User;