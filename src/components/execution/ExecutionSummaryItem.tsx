import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'
import { Box, HStack, Text } from '@chakra-ui/react'
import { useApplicationContext } from '../commons/application/context/ApplicationContext';
import { ExecutionAggregateType } from '../../model-types/ExecutionTypes';
import { MoneyFormatter } from '../../utils/MoneyFormatter';
import { Link, useParams } from 'react-router-dom';

type ExecutionSummaryItemProps = {
    executionAggregate: ExecutionAggregateType
}

type CurrentValueProps = {
    label: string,
    value: number
}

export function ExecutionSummaryItem({ executionAggregate }: ExecutionSummaryItemProps) {
    const { responsiveStatus: { isLarge } } = useApplicationContext()
    const { walletId } = useParams();

    return <Link to={`/executions/${walletId}/${executionAggregate.stockId}`} state={{symbol: executionAggregate.symbol}}>
        <Box _hover={{ filter: 'brightness(135%)' }} cursor={'pointer'} mt={2} display='flex' flexDir={isLarge ? 'row' : 'column'} justifyContent={isLarge ? 'space-between' : ''} fontSize='sm' fontWeight='medium' borderRadius={8} p={3} bgColor={'gray.700'}>
            <HStack width={isLarge ? '25%' : '100%'} justify={isLarge ? '' : 'space-between'} align='center'>
                <Text fontWeight='bold' >{executionAggregate.symbol}</Text>
                <Text> {executionAggregate.totalCustodyQuantity} cotas</Text>
            </HStack>
            <CurrencyValue label={'Pnl aberto'} value={12} />
            <CurrencyValue label={'Pnl fechado'} value={3} />
            <CurrencyValue label={'Preço atual'} value={11.44} />
        </Box>
    </Link>




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