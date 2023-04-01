import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'
import { Box, HStack, Text } from '@chakra-ui/react'
import { useApplicationContext } from '../commons/application/context/ApplicationContext';
import { ExecutionAggregateType } from '../../model-types/ExecutionTypes';
import { MoneyFormatter } from '../../utils/MoneyFormatter';
import { Link, useParams } from 'react-router-dom';
import { SockJs } from '../../config/websocket/WebSocket';
import { useEffect, useMemo, useRef } from 'react';
import { Message } from 'stompjs';

type ExecutionSummaryItemProps = {
    executionAggregate: ExecutionAggregateType,
    executionsSummary: ExecutionAggregateType[],
    setExecutionsSummary: (executionsSummary: ExecutionAggregateType[]) => void,
}

type CurrentValueProps = {
    label: string,
    value: number
}

const PNL_OPEN_TOTALIZATOR_TOPIC = (walletId: string, stockId: string) => `/client/user-id/${walletId}/${stockId}/pnl-open-totalizator`


export function ExecutionSummaryItem({ executionAggregate, setExecutionsSummary, executionsSummary }: ExecutionSummaryItemProps) {
    const currentExecutionSummary = useRef(executionsSummary);
    const socket = useMemo(() => SockJs.getInstance(), []);
    const { responsiveStatus: { isLarge } } = useApplicationContext()
    const { walletId } = useParams();

    useEffect(() => {
        subscribe()

        return () => {
            socket.unsubscribe(PNL_OPEN_TOTALIZATOR_TOPIC(walletId as string, executionAggregate.stockId as string))
        }
    }, []);

    useEffect(() => {
        currentExecutionSummary.current = executionsSummary;
    }, [executionsSummary])



    function subscribe() {
        socket.subscribe(PNL_OPEN_TOTALIZATOR_TOPIC(walletId as string, executionAggregate.stockId), updatePnlExecution);
    }

    function updatePnlExecution(message: Message | undefined) {
        const exec = currentExecutionSummary.current;
        const body = JSON.parse(message?.body || '');
        const executionsUpdated = exec.map(it => {
            const stockId = (body?.id as string).split(':')[1];
            if (it.stockId !== stockId) return it;

            it.totalPnlOpen = body?.pnlOpen || 0;;
            return it;
        })

        setExecutionsSummary([...executionsUpdated])
    }


    return <Link to={`/executions/${walletId}/${executionAggregate.stockId}`} state={{ symbol: executionAggregate.symbol }}>
        <Box _hover={{ filter: 'brightness(135%)' }} cursor={'pointer'} mt={2} display='flex' flexDir={isLarge ? 'row' : 'column'} justifyContent={isLarge ? 'space-between' : ''} fontSize='sm' fontWeight='medium' borderRadius={8} p={3} bgColor={'gray.700'}>
            <HStack width={isLarge ? '25%' : '100%'} justify={isLarge ? '' : 'space-between'} align='center'>
                <Text fontWeight='bold' >{executionAggregate.symbol}</Text>
                <Text> {executionAggregate.totalCustodyQuantity} cotas</Text>
            </HStack>
            <CurrencyValue label={'Pnl aberto'} value={executionAggregate.totalPnlOpen || 0} />
            <CurrencyValue label={'Pnl fechado'} value={executionAggregate.totalPnlClose || 0} />
            <CurrencyValue label={'Preço atual'} value={11.44} />
        </Box>
    </Link>




    function CurrencyValue({ label, value }: CurrentValueProps) {
        return <HStack width={isLarge ? '25%' : '100%'} justify={isLarge ? '' : 'space-between'} align='center' >
            <Text >{label}</Text>
            <HStack>
                <Text> {MoneyFormatter.shortBRL(value)}  </Text>
                {value >= 0 && <TriangleUpIcon color='green.400' />}
                {value <= 0 && <TriangleDownIcon color='red.400' />}
            </HStack>
        </HStack>
    }
}