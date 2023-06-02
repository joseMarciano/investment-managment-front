import { Box, Button, HStack, IconButton, MenuButton, MenuItem, MenuList, Text, VStack, Menu, Flex } from '@chakra-ui/react';
import { useMemo } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { HiDotsVertical } from 'react-icons/hi';
import { MdDeleteForever } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { CartesianGrid, Cell, Line, LineChart, Pie, PieChart, XAxis, YAxis } from 'recharts';
import { DEFAULT_STYLES } from '../../config/styles/theme';
import { CardEmptyList } from '../commons/card-empty-list/CardEmptyList';
import { SearchCommons } from '../commons/search/SearchCommons';
import { TitlePage } from '../commons/title-page/TitlePage';
import { useWalletContext } from './context/WalletContext';

export function WalletPage() {
    const { isLoading, wallets, searchWallets, findWalletById, deleteWallet } = useWalletContext();
    const navigate = useNavigate();


    function goToSummary(e: any, walletId: string) {
        navigate(`/execution-summary/${walletId}`);
    }

    return <Box>
        <TitlePage title='Carteiras' />
        <VStack p={4} gap={5}>
            <Box width={'100%'} display='flex' justifyContent={'space-between'} gap={2}>
                <Link to={'add'} state={{ modalIsOpen: true }}><Button isLoading={isLoading} colorScheme={'green'}>Adicionar</Button> </Link>
                <SearchCommons isLoading={isLoading} onClickRefresh={searchWallets} />
            </Box>
            <Box width='100%' >
                {!wallets?.length && <CardEmptyList model='Carteiras' />}
                {wallets.map((it) =>
                    <Box key={it.id}  cursor={'pointer'} mt={2} display='flex' justifyContent={'space-between'} alignItems='center' fontSize='sm' fontWeight='medium' borderRadius={8} p={3} bgColor={'gray.700'}>
                        <HStack onClick={(e) => goToSummary(e, it.id)} width={'100%'} align='center' justifyContent='space-between'>
                            <VStack width={'100%'} alignItems={'start'}>
                                <HStack gap={1}>
                                    <Box width='20px' height='20px' bgColor={it.color} borderRadius='50%'></Box>
                                    <Text fontWeight='bold' fontSize={'medium'} >{it.name}</Text>
                                </HStack>
                                <Text fontSize={'small'} color={'#C0C0C0'}>{it.description}</Text>
                            </VStack>
                        </HStack>
                        <MenuRow wallet={it} />
                    </Box>
                )}
            </Box>
        </VStack>
    </Box>

    function MenuRow({ wallet }: any) {
        const menu = useMemo(() => [
            {
                key: 'EDIT',
                label: 'Editar',
                icon: AiOutlineEdit,
                onClick: async () => {
                    navigate(`edit/${wallet.id}`, {
                        state: {
                            wallet: await findWalletById(wallet.id),
                            modalIsOpen: true
                        }
                    })
                }
            },
            {
                key: 'REMOVE',
                label: 'Excluir',
                icon: MdDeleteForever,
                onClick: () => {
                    deleteWallet(wallet.id)
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
                {menu.map((it) => {
                    return <MenuItem onClick={it.onClick} key={it.key} _hover={{ filter: 'brightness(135%)' }} bg={'inherit'} icon={<it.icon />}>
                        {it.label}
                    </MenuItem>
                })}
            </MenuList>
        </Menu>
    }
}