import Card from "../../components/Card";
// import { useState } from "react";
import { Container } from "react-bootstrap";
import UserTable from "../../components/UserTable";
import TransactionTable from "../../components/TransactionTable";

const Home = () => {
    // const [spent, setSpent] = useState(0);
    // const [remain, setRemain] = useState(0);
    const spentLink = "/";
    const remainLink = "/";

    // const handleClick = () => {
    //   console.log(user.uid);
    //   console.log(user.email);
    //   console.log(user.displayName);
    // };
    return (
        <>
            <Container id="feedback">
                <Card
                    className="fbcard"
                    head="Total Amount Spent"
                    // text={spent}
                    link={spentLink}
                />
                <Card
                    className="fbcard"
                    head="Budget Remaining"
                    // text={remain}
                    link={remainLink}
                />
            </Container>
            <br />
            <br />
            <Container id="content">
                <UserTable />
            </Container>
            <br />
            <br />
            <Container id="content">
                <TransactionTable />
            </Container>
        </>
    );
};

export default Home;
