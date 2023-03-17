import { Button } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "./AuthProvider";

const Profile = () => {
    const { logout } = useContext(AuthContext);


    return (
        <>
            <Button
                style={{ padding: 0, width: "100%" }}
                onClick={() => {
                    logout();
                }}
            >
                Logout
            </Button>
        </>
    );
};

export default Profile