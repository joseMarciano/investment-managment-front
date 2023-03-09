import { Box, Button, VStack } from '@chakra-ui/react';
import { SearchCommons } from '../commons/search/SearchCommons';
import { TitlePage } from '../commons/title-page/TitlePage';
import { ExecutionItem } from './ExecutionItem';
import { useApplicationContext } from '../../context/ApplicationContext';
import { useExecutionContext } from '../../context/ExecutionContext';
import { CardEmptyList } from '../commons/card-empty-list/CardEmptyList';

export function ExecutionPage() {
    const { responsiveStatus: { isLarge } } = useApplicationContext();
    const { executionsSummary } = useExecutionContext();

    return <Box>
        <TitlePage title='Execuções' />
        <VStack p={isLarge ? 4 : 2} gap={isLarge ? 5 : 1}>
            <Box width={'100%'} display='flex' flexDir={isLarge ? 'row' : 'column'} justifyContent={isLarge ? 'space-between' : ''} gap={2}>
                <Button colorScheme={'green'}>Adicionar</Button>
                <SearchCommons />
            </Box>
            <Box width='100%'>
                {(!executionsSummary || !executionsSummary.length ) && <CardEmptyList model='Execuções' />}
                {executionsSummary.map((it) => <ExecutionItem key={it.stockId} executionAggregate={it} />)}
            </Box>
        </VStack>
    </Box>
}