import React, { createContext, useContext, useState } from 'react'
import { Link } from 'react-router-dom'

export const GroupContext = createContext();
export const GroupProvider = ({ children }) => {
    const [currentGroup, setCurrentGroup] = useState('');
    return (
        <GroupContext.Provider value={{ currentGroup, setCurrentGroup }} >
            {children}
        </GroupContext.Provider>
    );
}
const GroupCard = ({ id, data }) => {
    const { currentGroup, setCurrentGroup } = useContext(GroupContext);
    const { title, desc } = data;
    // const [currentGroup, setCurrentGroup] = useState('');
    const handleGroup = () => {
        setCurrentGroup(title)
        console.log(currentGroup);
    }
    return (
        <>
            <Link onClick={handleGroup} to={`/transaction/${id}`}>
                <div style={{ fontSize: "3rem" }}>{title}</div>
                <div style={{ float: "right" }}>

                    <p>{desc}</p>
                    <p>
                        {/* <AvatarGroup size='md' max={5}>
                            {members?.map((member) => {
                                <Avatar name={member.name} src='https://bit.ly/ryan-florence' />
                            })}
                        </AvatarGroup> */}
                    </p>
                </div>
            </Link>
        </>
    )
}

export default GroupCard