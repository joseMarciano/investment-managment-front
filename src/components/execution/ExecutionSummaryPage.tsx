import { Box, Button, VStack } from '@chakra-ui/react';
import { SearchCommons } from '../commons/search/SearchCommons';
import { TitlePage } from '../commons/title-page/TitlePage';
import { ExecutionSummaryItem } from './ExecutionSummaryItem';
import { useApplicationContext } from '../commons/application/context/ApplicationContext';
import { useExecutionSummaryContext } from './context/ExecutionSummaryContext';
import { CardEmptyList } from '../commons/card-empty-list/CardEmptyList';

export function ExecutionSummaryPage() {
    const { responsiveStatus: { isLarge } } = useApplicationContext();
    const { executionsSummary, isLoading, searchExecutionSummary, modalDisclosure } = useExecutionSummaryContext();

    return <Box>
        <TitlePage title='Execuções' />
        <VStack p={isLarge ? 4 : 2} gap={isLarge ? 5 : 1}>
            <Box width={'100%'} display='flex' flexDir={isLarge ? 'row' : 'column'} justifyContent={isLarge ? 'space-between' : ''} gap={2}>
                <Button onClick={modalDisclosure.onOpen} isLoading={isLoading} colorScheme={'green'}>Adicionar</Button>
                <SearchCommons isLoading={isLoading} onClickRefresh={searchExecutionSummary} />
            </Box>
            <Box width='100%' >
                {(!executionsSummary || !executionsSummary.length) && <CardEmptyList model='Resumo de execuções' />}
                {executionsSummary.map((it) => <ExecutionSummaryItem key={it.stockId} executionAggregate={it} />)}
            </Box>
        </VStack>
    </Box>
}