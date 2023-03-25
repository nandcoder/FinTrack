import { useContext, useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { CircularProgress } from "@chakra-ui/react";
import Card from "../../components/Card";
import AddGroup from "./Sections/AddGroup";
import GroupCard from "./Sections/GroupCard";
import { db } from "../../utils/firebase";
import { AuthContext } from "../../components/Authentication/AuthProvider";

const Home = () => {
    const { user } = useContext(AuthContext);
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);
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
                    temp.push({ id: doc.id, data: doc.data() });
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            })
            .finally(() => {
                setGroups(temp)
                setLoading(false)
            });

    }, [user]);

    // const [spent, setSpent] = useState(0);
    // const [remain, setRemain] = useState(0);
    // const spentLink = "/";
    // const remainLink = "/";

    return (
        <>
            <Container id="feedback">
                <div class="absolute top-0 left-0 w-full h-full box-border grid place-items-center"><div class="text-center text-white font-Inter"><h1 class="text-3xl lg:text-4xl xl:text-5xl font-normal">Port Blair &amp; Swaraj Dweep</h1><h3 class="text-xl lg:text-xl xl:text-2xl lg:mt-3 font-normal">5 Days</h3></div></div>
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
                    <Button style={{ position: "fixed", width: "50px", height: "50px", right: "10%", bottom: "10%", borderRadius: "50%", backgroundColor: "cyan", fontSize: "1.5rem" }} onClick={handleShow}>+</Button>
                    {show && <AddGroup show={show} handleClose={handleClose} />}
                    {loading ? <CircularProgress left={"50%"} top={"50%"} isIndeterminate size='100px' thickness='4px' /> :
                        groups?.map((group) => (
                            <GroupCard id={group.id} data={group.data} key={group.id} />
                        ))}
                </div>
            </Container>
        </>
    );
};

export default Home;
