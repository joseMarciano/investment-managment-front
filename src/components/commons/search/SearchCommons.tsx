import { FaSearch } from 'react-icons/fa';
import { TbRefresh } from 'react-icons/tb';
import { Box, Button, Heading, HStack, Input, InputGroup, InputLeftElement, InputRightElement, VStack } from '@chakra-ui/react';
import { useResponsiveStatus } from '../../../hooks/useResponsiveStatus';

type SearchCommonsProps = {}

export function SearchCommons({ }: SearchCommonsProps) {

    return <Box width='100%' display={'flex'} gap={2}>
        <Button colorScheme={'blue'}>
            <TbRefresh />
        </Button>
        <InputGroup>
            <Input placeholder='O que você procura?' />
            <InputRightElement children={<FaSearch color='green.500' />} />
        </InputGroup>
    </Box>
}