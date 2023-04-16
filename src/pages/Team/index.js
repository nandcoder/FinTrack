import React from 'react'
import { Card, Container } from 'react-bootstrap'
import { UserCard } from 'react-ui-cards'
import nrj from '../../assets/images/nrj.jpg'
import ekta from '../../assets/images/ekta.jpeg'
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import { Heading } from '@chakra-ui/react'
const Team = () => {
    return (
        <Container fluid style={{ textAlign: 'center' }}>
            <Heading>Team Members</Heading>
            <br />
            <br />
            <Container style={{ display: 'flex', flexDirection: 'row', background: 'inherit', justifyContent: 'space-around' }}>
                <Card className="text-center team-card" style={{
                    maxWidth: '100%',
                    width: '250px',
                    background: 'inherit'
                }}>
                    <UserCard
                        float
                        href='https://github.com/nandcoder'
                        header='https://i.imgur.com/p5yXGQk.jpg'
                        avatar={nrj}
                        name='Nand Raj'
                        positionName='Full Stack Developer'
                        className='remove-effect'
                    />
                    <Card.Footer style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Card.Link href="https://www.linkedin.com/in/nand-raj/"><LinkedInIcon /> LinkedIn</Card.Link>
                        <Card.Link href="https://github.com/nandcoder"><GitHubIcon /> Github</Card.Link>
                        <Card.Link href="mailto:nandraj2001@gmail.com"><EmailIcon /> Email</Card.Link>
                    </Card.Footer>
                </Card>
                <Card className="text-center team-card" style={{
                    maxWidth: '100%',
                    width: '250px',
                    background: 'inherit'
                }}>
                    <UserCard
                        float
                        href='https://github.com/ekkri'
                        header='https://i.imgur.com/p5yXGQk.jpg'
                        avatar={ekta}
                        name='Ekta Kumari'
                        positionName='UI/UX Developer'
                        className='remove-effect'
                    />
                    <Card.Footer style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Card.Link href="https://www.linkedin.com/in/ekta-kumari-405084215/"><LinkedInIcon /> LinkedIn</Card.Link>
                        <Card.Link href="https://github.com/ekkri"><GitHubIcon /> Github</Card.Link>
                        <Card.Link href="mailto:ektak647@gmail.com@gmail.com"><EmailIcon /> Email</Card.Link>
                    </Card.Footer>
                </Card>
            </Container>
        </Container>
    )
}
export default Team