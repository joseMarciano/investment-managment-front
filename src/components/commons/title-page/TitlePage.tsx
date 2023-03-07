import { Box, Button, Heading, Input } from '@chakra-ui/react';

type TitlePageProps = {
    title: string
}

export function TitlePage({ title }: TitlePageProps) {
    return <Box padding='20px 10px 10px' as="header" textAlign={'center'}>
        <Heading size={'lg'}  fontWeight={1}> {title} </Heading>
    </Box>
}