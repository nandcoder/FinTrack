import React, { createContext, useContext, useState } from 'react'
import { Avatar, AvatarGroup } from '@chakra-ui/react';
import { LaunchRounded } from '@mui/icons-material';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const GroupContext = createContext();
export const GroupProvider = ({ children }) => {
    const [currentGroup, setCurrentGroup] = useState('');
    return (
        <GroupContext.Provider value={{ currentGroup, setCurrentGroup }} >
            {children}
        </GroupContext.Provider>
    );
}
const GroupCard = ({ id, data, item }) => {
    const { currentGroup, setCurrentGroup } = useContext(GroupContext);
    const { title, desc, days, members } = data;
    // const [currentGroup, setCurrentGroup] = useState('');
    const handleGroup = () => {
        setCurrentGroup(title)
        console.log(currentGroup);
    }
    return (
        <Container fluid>

            <div style={{ width: "100%", height: "25vh", display: 'flex', alignContent: 'center', alignItems: 'center', justifyContent: 'center', marginTop: '2%' }}>
                {/* <div className='rounded-xl overflow-hidden h-[65vw] md:h-[35vw] lg:h-72'>
                        <img src={item?.thumbnail} alt={`${item?.title} thumbnail`} className='w-full h-full object-cover' />
                    </div> */}
                <div style={{ width: "50vw", backgroundColor: 'cyan', borderRadius: '1.5rem', padding: '2rem' }}>
                    <div style={{ float: 'right', display: 'flex', flexDirection: 'column', alignItems: 'center', alignContent: 'center' }}>

                        <p style={{ display: 'inline-block' }}>{desc}</p>
                        <>
                            <AvatarGroup size='md' max={5}>
                                {members?.map((member, key) => (
                                    <Avatar key={key} name={member.name} src='' />
                                ))}
                            </AvatarGroup>
                        </>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', alignContent: 'center' }}>

                        <p style={{ fontSize: "2rem", display: "inline-block" }}>{title}</p>
                        <p style={{ fontSize: "1.5rem", display: "inline-block" }}>{days}</p>
                    </div>
                    <Link onClick={handleGroup} to={`/transaction/${id}`} style={{ fontSize: '1.5rem' }}>
                        Details
                        <LaunchRounded fontSize='1.5rem' />
                    </Link>
                </div>
            </div>

        </Container>
    )
}

export default GroupCard