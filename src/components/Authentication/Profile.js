import { Button } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { db } from "../../utils/firebase";
import { AuthContext } from "./AuthProvider";

const Profile = () => {
    const [userData, setUserData] = useState([]);
    const { user, logout } = useContext(AuthContext);
    useEffect(() => {
        const arr = [];
        db.collection("users")
            .where("email", "==", user.email)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                    const res = {
                        id: doc.id,
                        data: doc.data(),
                    }
                    arr.push(res)
                });

            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            })
            .finally(() => {
                setUserData(arr)
                console.log("data", arr)
            })
    }, [user])

    return (
        <>
            {userData?.map((item) => (
                <Dropdown.Menu style={{ padding: 0, textAlign: "center" }}>
                    <Dropdown.ItemText >{item.data.name}</Dropdown.ItemText>
                    <Dropdown.ItemText >{item.data.email}</Dropdown.ItemText>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={() => {
                        logout();
                    }} >Logout</Dropdown.Item>
                </Dropdown.Menu>
            ))}
        </>
    );
};

export default Profile