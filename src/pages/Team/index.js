import React from 'react'
import { UserCard } from 'react-ui-cards'

const Team = () => {
    return (
        <React.Fragment>

            <UserCard
                float
                href='https://github.com/nandcoder'
                header='https://i.imgur.com/p5yXGQk.jpg'
                avatar='https://i.imgur.com/kFkyYkZ.jpg'
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
                avatar='https://i.imgur.com/kFkyYkZ.jpg'
                name='Ekta Kumari'
                positionName='Web Developer'
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
        </React.Fragment>
    )
}
export default Team