import { FaSearch } from 'react-icons/fa';
import { TbRefresh } from 'react-icons/tb';
import { Box, Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react';

type SearchCommonsProps = {
    isLoading: boolean,
    onClickRefresh: (params: any) => any
}

export function SearchCommons({ isLoading, onClickRefresh }: SearchCommonsProps) {

    return <Box maxWidth='600px' width='100%' display={'flex'} alignSelf='center' gap={2}>
        <Button isLoading={isLoading} onClick={onClickRefresh} colorScheme={'blue'}>
            <TbRefresh />
        </Button>
        <InputGroup>
            <Input placeholder='O que você procura?' />
            <InputRightElement children={<FaSearch color='green.500' />} />
        </InputGroup>
    </Box>
}