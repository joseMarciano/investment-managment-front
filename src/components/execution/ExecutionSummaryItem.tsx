import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'
import { Box, HStack, Text } from '@chakra-ui/react'
import { useApplicationContext } from '../commons/application/context/ApplicationContext';
import { ExecutionAggregateType } from '../../model-types/ExecutionTypes';
import { MoneyFormatter } from '../../utils/MoneyFormatter';
import { Link, useParams } from 'react-router-dom';
import { SockJs } from '../../config/websocket/WebSocket';
import { useEffect, useMemo, useState } from 'react';
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
const LAST_TRADE_PRICE_TOPIC = (symbol: string) => `/client/user-id/${symbol}/last-trade-price`


export function ExecutionSummaryItem({ executionAggregate }: ExecutionSummaryItemProps) {
    const socket = useMemo(() => SockJs.getInstance(), []);
    const { responsiveStatus: { isLarge } } = useApplicationContext();
    const { walletId } = useParams();

    return <Link to={`/executions/${walletId}/${executionAggregate.stockId}`} state={{ symbol: executionAggregate.symbol }}>
        <Box _hover={{ filter: 'brightness(135%)' }} cursor={'pointer'} mt={2} display='flex' flexDir={isLarge ? 'row' : 'column'} justifyContent={isLarge ? 'space-between' : ''} fontSize='sm' fontWeight='medium' borderRadius={8} p={3} bgColor={'gray.700'}>
            <HStack width={isLarge ? '25%' : '100%'} justify={isLarge ? '' : 'space-between'} align='center'>
                <Text fontWeight='bold' >{executionAggregate.symbol}</Text>
                <Text> {executionAggregate.totalCustodyQuantity} cotas</Text>
            </HStack>
            <PnlOpenWebSocketWrapper value={executionAggregate.totalPnlOpen} />
            <CurrencyValue label={'Pnl fechado'} value={executionAggregate.totalPnlClose || 0} />
            <LastTradePriceWebSocketWrapper />
        </Box>
    </Link>


    function LastTradePriceWebSocketWrapper() {
        const [lastTradePrice, setLastTradePrice] = useState(0);


        useEffect(() => {
            socket.subscribe(LAST_TRADE_PRICE_TOPIC(executionAggregate.symbol), updateLastTradePrice);

            return () => {
                socket.unsubscribe(LAST_TRADE_PRICE_TOPIC(executionAggregate.symbol as string))
            }
        }, [])

        function updateLastTradePrice(message: Message | undefined) {
            const body = JSON.parse(message?.body || '');
            setLastTradePrice(body.lastTradePrice || 0)
        }

        return <CurrencyValue label={'Preço atual'} value={lastTradePrice || 0} />
    }

    function PnlOpenWebSocketWrapper({ value }: any) {
        const [pnlOpen, setPnlOpen] = useState(value);

        useEffect(() => {
            subscribe()

            return () => {
                socket.unsubscribe(PNL_OPEN_TOTALIZATOR_TOPIC(walletId as string, executionAggregate.stockId as string))
            }
        }, []);

        useEffect(() => {
            setPnlOpen(pnlOpen);
        }, [value])



        function subscribe() {
            socket.subscribe(PNL_OPEN_TOTALIZATOR_TOPIC(walletId as string, executionAggregate.stockId), updatePnlExecution);
        }

        function updatePnlExecution(message: Message | undefined) {
            const body = JSON.parse(message?.body || '');
            setPnlOpen(body?.pnlOpen || 0)
        }

        return <CurrencyValue label={'Pnl aberto'} value={pnlOpen || 0} />
    }


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