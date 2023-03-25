import React from 'react'
import { Badge, Stack } from '@chakra-ui/react'

const ListMail = ({ mails }) => {

    return (
        <Stack direction='row'>
            {mails.map((user) => (
                <Badge colorScheme={'green'}>{user.email} </Badge>
            ))}
        </Stack>
    )
}

export default ListMail