import React from 'react'
import { Container } from 'react-bootstrap'
import { UserCard } from 'react-ui-cards'
import nrj from '../../assets/images/nrj.jpg'
import ekta from '../../assets/images/ekta.jpeg'

const Team = () => {
    return (
        <React.Fragment>
            <Container style={{ display: 'flex', flexDirection: 'row' }}>

                <UserCard
                    float
                    href='https://github.com/nandcoder'
                    header='https://i.imgur.com/p5yXGQk.jpg'
                    avatar={nrj}
                    name='Nand Raj'
                    positionName='Full Stack Developer'
                    stats={[
                        {
                            name: 'commits',
                            value: 365
                        },
                        {
                            name: 'stars',
                            value: 110
                        },
                        {
                            name: 'repositories',
                            value: 54
                        }
                    ]}
                />
                <UserCard
                    float
                    href='https://github.com/ekkri'
                    header='https://i.imgur.com/p5yXGQk.jpg'
                    avatar={ekta}
                    name='Ekta Kumari'
                    positionName='UI/UX Developer'
                    stats={[
                        {
                            name: 'commits',
                            value: 365
                        },
                        {
                            name: 'stars',
                            value: 110
                        },
                        {
                            name: 'repositories',
                            value: 54
                        }
                    ]}
                />
            </Container>
        </React.Fragment>
    )
}
export default Team