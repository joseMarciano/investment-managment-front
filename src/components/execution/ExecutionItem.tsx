import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'
import { Box, HStack, Text } from '@chakra-ui/react'
import { useApplicationContext } from '../../context/ApplicationContext';
import { ExecutionAggregateType } from '../../model-types/ExecutionTypes';
import { MoneyFormatter } from '../../utils/MoneyFormatter';

type ExecutionItemProps = {
    executionAggregate: ExecutionAggregateType
}

type CurrentValueProps = {
    label: string,
    value: number
}

export function ExecutionItem({ executionAggregate }: ExecutionItemProps) {
    const { responsiveStatus: { isLarge } } = useApplicationContext()


    return <Box mt={2} display='flex' flexDir={isLarge ? 'row' : 'column'} justifyContent={isLarge ? 'space-between' : ''} fontSize='sm' fontWeight='medium' borderRadius={8} p={3} bgColor={'gray.700'}>
        <HStack width={isLarge ? '25%' : '100%'} justify={isLarge ? '' : 'space-between'} align='center'>
            <Text fontWeight='bold' >{executionAggregate.stockName}</Text>
            <Text> {executionAggregate.executedQuantity} cotas</Text>
        </HStack>
        <CurrencyValue label={'Pnl aberto'} value={executionAggregate.pnlOpen} />
        <CurrencyValue label={'Pnl fechado'} value={executionAggregate.pnlClose} />
        <CurrencyValue label={'Preço atual'} value={executionAggregate.lastPrice} />
    </Box>




    function CurrencyValue({ label, value }: CurrentValueProps) {
        return <HStack width={isLarge ? '25%' : '100%'} justify={isLarge ? '' : 'space-between'} align='center' >
            <Text >{label}</Text>
            <HStack>
                <Text> {MoneyFormatter.shortBRL(value)}  </Text>
                <TriangleUpIcon color='green.400' />
                <TriangleDownIcon color='red.400' />
            </HStack>
        </HStack>
    }
}