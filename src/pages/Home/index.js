import { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Card from "../../components/Card";
import AddGroup from "./Sections/AddGroup";
import GroupCard from "./Sections/GroupCard";
import { db } from "../../utils/firebase";
import { AuthContext } from "../../components/Authentication/AuthProvider";
import AddButton from "../../components/AddButton";
import Loader from "../../components/Loader";

// export const DataContext = createContext();
// export const DataProvider = ({ children }) => {
//     const { user } = useContext(AuthContext);
//     const [currentGroup, setCurrentGroup] = useState('');
//     const [transactions, setTransactions] = useState([]);
//     const [users, setUsers] = useState({});
//     const [friends, setFriends] = useState([]);
//     useEffect(() => {
//         const temp = [];
//         const tempFriends = []
//         db.collection("transactions")
//             .where("involved", "array-contains", user.uid)
//             .get()
//             .then((querySnapshot) => {
//                 querySnapshot.forEach((doc) => {
//                     // console.log(doc.id, " => ", doc.data());
//                     const id = doc.id;
//                     const data = doc.data();
//                     const finalTransaction = {
//                         id,
//                         data,
//                     }
//                     data.involved.forEach(personId => {
//                         if (tempFriends.includes(personId)) { }
//                         else tempFriends.push(personId)
//                     });
//                     temp.push(finalTransaction);
//                 })
//             })
//             .catch((error) => {
//                 console.log("Error getting documents: ", error);
//             })
//             .finally(() => {
//                 setFriends(tempFriends);
//                 setTransactions(temp);
//             });


//     }, [user]);
//     useEffect(() => {
//         const temp = {}
//         if (friends.length) db.collection("users")
//             .where("userId", "in", friends)
//             .get()
//             .then((querySnapshot) => {
//                 querySnapshot.forEach((doc) => {
//                     // doc.data() is never undefined for query doc snapshots
//                     // console.log(doc.id, " => ", doc.data());
//                     const data = doc.data();
//                     const dataWithAmt = { ...data, amount: 0 };
//                     temp[data.userId] = dataWithAmt;
//                     // setUsers((prevUsers) => {
//                     //     return { ...prevUsers, [id]: dataWithAmt, }
//                     // })
//                 });
//             })
//             .catch((error) => {
//                 console.log("Error getting documents: ", error);
//             })
//             .finally(() => {
//                 setUsers(temp)
//                 // setLoading(false)
//             })
//     }, [friends]);

//     return (
//         <DataContext.Provider value={{ transactions, setTransactions, users, setUsers, currentGroup, setCurrentGroup }} >
//             {children}
//         </DataContext.Provider>
//     )
// }

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
            .then((data) => {
                data.forEach((doc) => {
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
            <Container id="content">
                <div className="groups-wrapper">
                    <AddButton handler={handleShow} />
                    {show && <AddGroup show={show} handleClose={handleClose} />}
                    {loading ? <Loader /> :
                        groups?.map((group) => (
                            <GroupCard id={group.id} data={group.data} key={group.id} />
                        ))}
                </div>
            </Container>
        </>
    );
};

export default Home;
