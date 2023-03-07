import { Box, Button, Heading, HStack, Input, VStack } from '@chakra-ui/react';
import { useResponsiveStatus } from '../../hooks/useResponsiveStatus';
import { SearchCommons } from '../commons/search/SearchCommons';
import { TitlePage } from '../commons/title-page/TitlePage';

export function ExecutionPage() {
    const { isLarge } = useResponsiveStatus();

    return <Box>
        <TitlePage title='Execuções' />
        <Box p={isLarge ? 4: 2}>
            <Box display='flex' flexDir={isLarge ? 'row' : 'column'} justifyContent={isLarge ? 'space-between' : ''} gap={2}>
                <Button colorScheme={'green'}>Adicionar</Button>
                <SearchCommons />
            </Box>
        </Box>
    </Box>
}