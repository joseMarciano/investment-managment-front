import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react"
import { Loader } from '../../commons/loader/Loader';
import { WalletPagination, WalletPageItem, Wallet } from '../../../model-types/WalletTypes';
import { useApplicationContext } from '../../commons/application/context/ApplicationContext';

type WalletContextProps = {
    wallets: WalletPageItem[],
    setWallets: (wallets: WalletPageItem[]) => void,
    searchWallets: () => Promise<void>,
    deleteWallet: (walletId: string) => Promise<void>,
    findWalletById: (walletId: string) => Promise<Wallet>,
    isLoading: boolean
};

type WalletContextProviderProps = {
    children: ReactNode
};

const WalletContext = createContext({} as WalletContextProps)

export function WalletContextProvider({ children }: WalletContextProviderProps) {
    const { http } = useApplicationContext();
    const baseUrl = useMemo(() => `wallets`, []);
    const [wallets, setWallets] = useState<WalletPageItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        searchWallets();
    }, [])

    return (
        <WalletContext.Provider value={{  setWallets, wallets, isLoading, searchWallets, deleteWallet, findWalletById }}>
            {children}
            <Loader isLoading={isLoading} />
        </WalletContext.Provider>
    )

    async function searchWallets() {
        setIsLoading(true);
        getWallets()
            .then((data) => setWallets(data ?? []))
            .catch((e) => console.error('Error on fetch Wallets', e))
            .finally(() => setIsLoading(false))
    }


    async function deleteWallet(walletId: string): Promise<void> {
        setIsLoading(true);
        return http.delete(`${baseUrl}/${walletId}`)
            .then(searchWallets)
            .catch((e) => console.error(`Error on delete Wallet ${walletId}`, e))
            .finally(() => setIsLoading(false))
    }

    async function getWallets(): Promise<WalletPageItem[]> {
        try {
            setIsLoading(true);
            const { data } = await http.get<WalletPagination>(baseUrl);
            return data?.items || [];
        } catch (error) {
            console.error('Error on fetch Wallets', error);
            return [];
        }
        finally {
            setIsLoading(false);
        }
    }

    async function findWalletById(walletId: string): Promise<Wallet> {
        try {
            const { data } = await http.get<Wallet>(`${baseUrl}/${walletId}`);
            return data;
        } catch (error) {
            throw new Error('Error on fetch Wallets', { cause: error })
        }
    }
}

export function useWalletContext() {
    return useContext(WalletContext)
}