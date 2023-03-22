import { useContext, useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import Card from "../../components/Card";
import AddGroup from "./Sections/AddGroup";
import GroupCard from "./Sections/GroupCard";
import { db } from "../../utils/firebase";
import { AuthContext } from "../../components/Authentication/AuthProvider";

const Home = () => {
    const { user } = useContext(AuthContext);
    const [groups, setGroups] = useState([{ name: "123" }]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        let temp = [];
        db.collection("groups")
            .where("members", "array-contains", user.uid)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    temp.push(doc.data());
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            })
            .finally(() => {
                setGroups(temp)
            });

    }, [user]);

    // const [spent, setSpent] = useState(0);
    // const [remain, setRemain] = useState(0);
    // const spentLink = "/";
    // const remainLink = "/";

    return (
        <>
            <Container id="feedback">
                <Card
                    className="fbcard"
                    head="Total Expenditure"
                    text="10000"
                    link="/transaction"
                />
                <Card
                    className="fbcard"
                    head="My Expenses"
                    text="3000"
                    link="/transaction"
                />
                <Card
                    className="fbcard"
                    head="Amount Pending"
                    text="800"
                    link="/user"
                />
            </Container>
            <br />
            <br />
            <Container id="content">
                <div className="groups-wrapper">
                    <Button onClick={handleShow}>+</Button>
                    {show && <AddGroup show={show} handleClose={handleClose} />}
                    {groups?.map((group, key) => (
                        <GroupCard name={group.title} key={key} />
                    ))}
                </div>
            </Container>
        </>
    );
};

export default Home;
