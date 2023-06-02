


import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { Box, Heading, HStack, Image, Stat, StatArrow, StatGroup, StatHelpText, StatLabel, StatNumber, Text, VStack } from '@chakra-ui/react';
import { useStockRadarContext } from './context/StockRadarContext';
import { MoneyFormatter } from '../../utils/MoneyFormatter';
import { PercentageFormatter } from '../../utils/PercentageFormatter';

export function StockRadarPage() {
    const { lowPricesStocks, highPricesStocks } = useStockRadarContext();
    debugger;
    return <Box>
        <HStack m={5}>
            <Box width='400px' p={5}>
                <Heading>Maiores altas</Heading>
                <StockInformation stocks={highPricesStocks} type='high' />
            </Box>
            <Box width='400px' p={5}>
                <Heading>Maiores baixas</Heading>
                <StockInformation stocks={lowPricesStocks} type='low' />
            </Box>
        </HStack >
    </Box >;


    function StockInformation({ stocks = [], type }: any) {
        debugger;
        return <VStack padding={4} alignItems='flex-start' width='100%'>
            {stocks.map((it: any) => (<HStack key={it.symbol}>
                <Image height={'50px'} src={it.logo} />
                <VStack flex={1} alignItems='flex-start' spacing={0} width='100%'>
                    <Text fontWeight={'bold'}>{it.symbol} - {it.name}</Text>
                    <HStack width='100%' justifyContent='space-between'>
                        <Text m={0}>{MoneyFormatter.shortBRL(it.price)}</Text>
                        <HStack width='100%'>
                            {type === 'high' && <TriangleUpIcon color='green.400' />}
                            {type === 'low' && <TriangleDownIcon color='red.400' />}
                            <Text>{PercentageFormatter.format(it.change_percent / 100)}</Text>
                        </HStack>
                    </HStack>
                </VStack>
            </HStack>))}
        </VStack>;
    }

}