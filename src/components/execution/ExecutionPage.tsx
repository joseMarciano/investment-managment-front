import { Box, Button, HStack, IconButton, Menu, MenuButton, MenuItem, MenuList, Stat, StatArrow, StatGroup, StatLabel, StatNumber, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tooltip, Tr, VStack } from '@chakra-ui/react';
import { SearchCommons } from '../commons/search/SearchCommons';
import { TitlePage } from '../commons/title-page/TitlePage';
import { useApplicationContext } from '../commons/application/context/ApplicationContext';
import { useExecutionContext } from './context/ExecutionContext';
import { CardEmptyList } from '../commons/card-empty-list/CardEmptyList';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { ExecutionPageItem } from '../../model-types/ExecutionTypes';
import { DateFormatter } from '../../utils/DateFormatter';
import { BsCurrencyExchange } from 'react-icons/bs';
import { AiOutlineEdit, AiOutlineShoppingCart } from 'react-icons/ai';
import { HiDotsVertical } from 'react-icons/hi';
import { MdAttachMoney, MdDeleteForever } from 'react-icons/md';
import { MoneyFormatter } from '../../utils/MoneyFormatter';
import { PercentageFormatter } from '../../utils/PercentageFormatter';
import { DEFAULT_STYLES } from '../../config/styles/theme';
import { useEffect, useMemo, useState } from 'react';
import { SockJs } from '../../config/websocket/WebSocket';
import { Message } from 'stompjs';
import { TriangleDownIcon, TriangleUpIcon, } from '@chakra-ui/icons';
import { BsDashCircleFill } from 'react-icons/bs';

const PNL_OPEN_TOPIC = (executionId: string) => `/client/user-id/${executionId}/pnl-open`;
const PNL_OPEN_TOTALIZATOR_TOPIC = (walletId: string, stockId: string) => `/client/user-id/${walletId}/${stockId}/pnl-open-totalizator`;

type ExecutionRowProps = {
    execution: ExecutionPageItem;
};

type MenuRowProps = {
    execution: ExecutionPageItem;
};

export function ExecutionPage() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { stockId, walletId } = useParams();
    const symbol = useMemo(() => state?.symbol, []);
    const socket = useMemo(() => SockJs.getInstance(), []);

    const { responsiveStatus: { isLarge } } = useApplicationContext();
    const { isLoading, searchExecutions, deleteExecution, findExecutionById, executions, setExecutions, searchExecutionsTotalizator, executionsTotalizator, setExecutionsTotalizator } = useExecutionContext();


    return <Box>
        <TitlePage title={`Execuções de ${symbol}`} />
        <VStack p={isLarge ? 4 : 2} gap={isLarge ? 5 : 1}>

            <Box width='100%' >
                <StatGroup borderRadius='10px' bgColor='gray.700' p={5}>
                    <Stat>
                        <StatLabel>Quantidade comprados</StatLabel>
                        <StatNumber>{(executionsTotalizator?.totalBoughtQuantity || 0) - executionsTotalizator?.totalSoldQuantity || 0} </StatNumber>
                    </Stat>
                    <Stat>
                        <StatLabel>Quantidade vendidos</StatLabel>
                        <StatNumber>{executionsTotalizator?.totalSoldQuantity || 0} </StatNumber>
                    </Stat>
                    <Stat>
                        <StatLabel>PnL total aberto</StatLabel>
                        <PnlOpenTotalizatorWebSocketWrapper value={executionsTotalizator?.totalPnlOpen || 0} />
                    </Stat>
                    <Stat>
                        <StatLabel>PnL total fechado</StatLabel>
                        <StatNumber>
                            {MoneyFormatter.shortBRL(executionsTotalizator?.totalPnlClose || 0)}
                            {executionsTotalizator?.totalPnlClose >= 0 && <StatArrow type='increase' />}
                            {executionsTotalizator?.totalPnlClose <= 0 && <StatArrow type='decrease' />}
                        </StatNumber>
                    </Stat>
                </StatGroup>
            </Box>
            <Box width={'100%'} display='flex' flexDir={isLarge ? 'row' : 'column'} justifyContent={isLarge ? 'space-between' : ''} gap={2}>
                <Link to={'add'} state={{
                    modalIsOpen: true, stock: {
                        label: symbol,
                        value: stockId
                    }
                }}><Button isLoading={isLoading} colorScheme={'green'}>Adicionar</Button></Link>
                <SearchCommons isLoading={isLoading} onClickRefresh={() => {
                    searchExecutions();
                    searchExecutionsTotalizator();
                }} />
            </Box>
            <Box textAlign='center' width='100%' >
                {!executions?.length && <CardEmptyList model='Execuções' />}
                {!!executions?.length && <TableContainer>
                    <Table>
                        <TableCaption>Dados de execuções de {symbol}</TableCaption>
                        <Thead>
                            <ExecutionColumns />
                        </Thead>
                        <Tbody>
                            {executions.map(it => <ExecutionRow key={it.id} execution={it} />)}
                        </Tbody>
                    </Table>
                </TableContainer>}
            </Box>
        </VStack>
    </Box>;

    function ExecutionColumns() {
        return <Tr>
            <Th textAlign='center'>Status</Th>
            <Th textAlign='center'>Pnl Aberto(R$)</Th>
            <Th textAlign='center'>Pnl Fechado(R$)</Th>
            <Th textAlign='center'>Qnt. compra/venda</Th>
            {/* <Th textAlign='center'>Param. lucro(%)</Th> */}
            <Th textAlign='center'>Data de compra/venda</Th>
            <Th textAlign='center'></Th>
        </Tr>;
    }

    function ExecutionRow({ execution }: ExecutionRowProps) {

        const TdItem = ({ value }: { value: string | number | null; }) => <Td textAlign='center'>{value}</Td>;

        return <Tr>
            <Td><HStack justifyContent={'center'}>{execution.status === 'BUY' ? <AiOutlineShoppingCart/> : <MdAttachMoney />}</HStack></Td>
            <PnlOpenWebSocketWrapper execution={execution} />
            <PnlRow pnl={execution.pnlClose || 0} pnlPercengate={execution.pnlClosePercentage} />
            <TdItem value={execution.executedQuantity} />
            {/* <TdItem value={execution.profitPercentage} /> */}
            <TdItem value={DateFormatter.format(execution.executedAt)} />
            <Td textAlign='center'><MenuRow execution={execution} /></Td>
        </Tr>;
    }

    function PnlRow({ pnl, pnlPercengate }: { pnl: number, pnlPercengate: number; }) {
        return <Td textAlign='center'>
            <HStack justifyContent={'center'}>
                <Tooltip label={MoneyFormatter.shortBRL(pnl)}>
                    <Text>{PercentageFormatter.format(pnlPercengate)}  </Text>
                </Tooltip>
                {pnl > 0 && <TriangleUpIcon alignSelf='flex-end' color='green.400' />}
                {pnl < 0 && <TriangleDownIcon alignSelf='flex-end' color='red.400' />}
                {pnl === 0 && <BsDashCircleFill />}
            </HStack>
        </Td>;
    }

    function PnlOpenWebSocketWrapper({ execution }: any) {
        const [pnlOpen, setPnlOpen] = useState(execution.pnlOpen);
        const [pnlOpenPercentage, setPnlOpenPercentage] = useState(execution.pnlOpenPercentage);

        useEffect(() => {
            subscribe();

            return () => {
                socket.unsubscribe(PNL_OPEN_TOPIC(execution.id as string));
            };
        }, []);

        useEffect(() => {
            setPnlOpen(pnlOpen);
            setPnlOpenPercentage(pnlOpenPercentage);
        }, [execution.pnlOpen, execution.pnlOpenPercentage]);



        function subscribe() {
            socket.subscribe(PNL_OPEN_TOPIC(execution.id as string), updatePnlExecution);
        }

        function updatePnlExecution(message: Message | undefined) {
            const body = JSON.parse(message?.body || '');
            setPnlOpen(body?.pnl || 0);
            setPnlOpenPercentage(body?.pnlOpenPercentage || 0);
        }

        return <PnlRow pnl={pnlOpen || 0} pnlPercengate={pnlOpenPercentage} />;
    }


    function PnlOpenTotalizatorWebSocketWrapper({ value }: any) {
        const [pnlOpenTotalizator, setPnlOpenTotalizator] = useState(value);

        useEffect(() => {
            subscribe();

            return () => {
                socket.unsubscribe(PNL_OPEN_TOTALIZATOR_TOPIC(walletId as string, stockId as string));
            };
        }, []);

        useEffect(() => {
            setPnlOpenTotalizator(pnlOpenTotalizator);
        }, [value]);



        function subscribe() {
            socket.subscribe(PNL_OPEN_TOTALIZATOR_TOPIC(walletId as string, stockId as string), updatePnlExecution);
        }

        function updatePnlExecution(message: Message | undefined) {
            const body = JSON.parse(message?.body || '');
            setPnlOpenTotalizator(body?.pnlOpen || 0);
        }

        return <StatNumber>
            {MoneyFormatter.shortBRL(pnlOpenTotalizator || 0)}
            {pnlOpenTotalizator >= 0 && <StatArrow type='increase' />}
            {pnlOpenTotalizator <= 0 && <StatArrow type='decrease' />}
        </StatNumber>;
    }


    function MenuRow({ execution }: MenuRowProps) {
        const menu = useMemo(() => [
            {
                key: 'SELL',
                label: 'Vender',
                icon: BsCurrencyExchange,
                onClick: () => {
                    navigate(`sell/${execution.id}`, {
                        state: {
                            modalIsOpen: true,
                            isSelling: true,
                            stock: {
                                value: stockId,
                                label: symbol
                            }
                        }
                    });
                }
            },
            {
                key: 'EDIT',
                label: 'Editar',
                icon: AiOutlineEdit,
                onClick: async () => {
                    navigate(`edit/${execution.id}`, {
                        state: {
                            execution: await findExecutionById(execution.id),
                            modalIsOpen: true,
                            stock: {
                                value: stockId,
                                label: symbol
                            }
                        }
                    });
                }
            },
            {
                key: 'REMOVE',
                label: 'Excluir',
                icon: MdDeleteForever,
                onClick: () => {
                    deleteExecution(execution.id).then(searchExecutionsTotalizator);
                }
            },
        ], []);

        return <Menu size='sm' >
            <MenuButton
                display='flex'
                alignItems='center'
                as={IconButton}
                aria-label='Options'
                icon={<HiDotsVertical />}
                variant='unstyled'
            />
            <MenuList bg={DEFAULT_STYLES.styles.global.body.bg}>
                {menu.map((it) => {
                    if ((it.key === 'SELL' && execution.status === 'SELL') || (execution.executedQuantity === 0 && it.key === 'SELL')) return null;
                    return <MenuItem onClick={it.onClick} key={it.key} _hover={{ filter: 'brightness(135%)' }} bg={'inherit'} icon={<it.icon />}>
                        {it.label}
                    </MenuItem>;

                })}
            </MenuList>
        </Menu>;
    }
}