import { Box, Button, IconButton, Menu, MenuButton, MenuItem, MenuList, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, VStack } from '@chakra-ui/react';
import { SearchCommons } from '../commons/search/SearchCommons';
import { TitlePage } from '../commons/title-page/TitlePage';
import { useApplicationContext } from '../commons/application/context/ApplicationContext';
import { useExecutionContext } from './context/ExecutionContext';
import { CardEmptyList } from '../commons/card-empty-list/CardEmptyList';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { ExecutionPageItem } from '../../model-types/ExecutionTypes';
import { DateFormatter } from '../../utils/DateFormatter';
import { BsCurrencyExchange } from 'react-icons/bs';
import { AiOutlineEdit } from 'react-icons/ai';
import { HiDotsVertical } from 'react-icons/hi'
import { MdDeleteForever } from 'react-icons/md'
import { MoneyFormatter } from '../../utils/MoneyFormatter';
import { DEFAULT_STYLES } from '../../config/styles/theme';
import { useMemo } from 'react';

type ExecutionRowProps = {
    execution: ExecutionPageItem
}

type MenuRowProps = {
    execution: ExecutionPageItem
}

export function ExecutionPage() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { stockId } = useParams();
    const symbol = useMemo(() => state?.symbol, [])

    const { responsiveStatus: { isLarge } } = useApplicationContext();
    const { isLoading, searchExecutions, deleteExecution, findExecutionById, executions } = useExecutionContext();

    return <Box>
        <TitlePage title={`Execuções de ${symbol}`} />
        <VStack p={isLarge ? 4 : 2} gap={isLarge ? 5 : 1}>
            <Box width={'100%'} display='flex' flexDir={isLarge ? 'row' : 'column'} justifyContent={isLarge ? 'space-between' : ''} gap={2}>
                <Link to={'add'} state={{ modalIsOpen: true, stock: {
                    label: symbol,
                    value: stockId
                } }}><Button isLoading={isLoading} colorScheme={'green'}>Adicionar</Button></Link>
                <SearchCommons isLoading={isLoading} onClickRefresh={searchExecutions} />
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
    </Box>

    function ExecutionColumns() {
        return <Tr>
            <Th textAlign='center'>Status</Th>
            <Th textAlign='center'>Pnl Aberto(R$)</Th>
            <Th textAlign='center'>Pnl Fechado(R$)</Th>
            <Th textAlign='center'>Qnt. compra/venda</Th>
            <Th textAlign='center'>Param. lucro(%)</Th>
            <Th textAlign='center'>Data de compra/venda</Th>
            <Th textAlign='center'></Th>
        </Tr>
    }

    function ExecutionRow({ execution }: ExecutionRowProps) {

        const TdItem = ({ value }: { value: string | number | null }) => <Td textAlign='center'>{value}</Td>

        return <Tr>
            <TdItem value={execution.status} />
            <TdItem value={MoneyFormatter.shortBRL(9)} />
            <TdItem value={MoneyFormatter.shortBRL(4)} />
            <TdItem value={execution.executedQuantity} />
            <TdItem value={execution.profitPercentage} />
            <TdItem value={DateFormatter.format(execution.executedAt)} />
            <Td textAlign='center'><MenuRow execution={execution} /></Td>
        </Tr>
    }

    function MenuRow({ execution }: MenuRowProps) {
        const menu = useMemo(() => [
            {
                label: 'Vender',
                icon: BsCurrencyExchange,
                onClick: () => {
                    navigate(`sell/${execution.id}`, {state: {
                        modalIsOpen: true,
                        isSelling: true,
                        stock: {
                            value: stockId,
                            label: symbol
                        }
                    }})
                 }
            },
            {
                label: 'Editar',
                icon: AiOutlineEdit,
                onClick: async () => {
                    navigate(`edit/${execution.id}`, {state: {
                        execution: await findExecutionById(execution.id),
                        modalIsOpen: true,
                        stock: {
                            value: stockId,
                            label: symbol
                        }
                    }})
                }
            },
            {
                label: 'Excluir',
                icon: MdDeleteForever,
                onClick: () => {
                    deleteExecution(execution.id);
                }
            },
        ], [])

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
                {menu.map((it) => <MenuItem onClick={it.onClick} key={it.label} _hover={{ filter: 'brightness(135%)' }} bg={'inherit'} icon={<it.icon />}>
                    {it.label}
                </MenuItem>
                )}
            </MenuList>
        </Menu>
    }
}