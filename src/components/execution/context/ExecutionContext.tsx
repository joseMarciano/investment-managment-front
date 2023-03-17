import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react"
import { useLocation, useParams } from 'react-router-dom';
import { Loader } from '../../commons/loader/Loader';
import { ExecutionPagination, ExecutionPageItem } from '../../../model-types/ExecutionTypes';
import { ExecutionModal } from '../modal/ExecutionModal';
import { useDisclosure, UseDisclosureReturn } from '@chakra-ui/react';
import http from '../../../config/http/axios';

type ExecutionContextProps = {
    executions: ExecutionPageItem[],
    searchExecutions: () => Promise<void>,
    deleteExecution: (executionId: string) => Promise<void>,
    isLoading: boolean,
    modalDisclosure: UseDisclosureReturn
};

type ExecutionContextProviderProps = {
    children: ReactNode
};

const ExecutionContext = createContext({} as ExecutionContextProps)

export function ExecutionContextProvider({ children }: ExecutionContextProviderProps) {
    const { walletId } = useParams();
    const { state: { stockId } } = useLocation();
    const { symbol } = useParams();
    const baseUrl = useMemo(() => `executions`, []);
    const [executions, setExecutions] = useState<ExecutionPageItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const modalDisclosure = useDisclosure({ id: 'Execution-Modal', onClose: () => searchExecutions() });
    let currentExecution = null as unknown as string;

    useEffect(() => {
        searchExecutions();
    }, [])

    return (
        <ExecutionContext.Provider value={{ executions, isLoading, searchExecutions, deleteExecution, modalDisclosure }}>
            {children}
            {modalDisclosure?.isOpen && <ExecutionModal params={{
                stock: {
                    value: stockId,
                    label: symbol
                }
            }} disclosure={modalDisclosure} />}
            <Loader isLoading={isLoading} />
        </ExecutionContext.Provider>
    )

    async function searchExecutions() {
        setIsLoading(true);
        getExecutions()
            .then((data) => setExecutions(data ?? []))
            .catch((e) => console.error('Error on fetch executions', e))
            .finally(() => setIsLoading(false))
    }

    async function deleteExecution(executionId: string): Promise<void> {
        setIsLoading(true);
        return http.delete(`${baseUrl}/${executionId}`)
            .then(searchExecutions)
            .catch((e) => console.error(`Error on delete execution ${executionId}`))
            .finally(() => setIsLoading(false))
    }

    async function getExecutions(): Promise<ExecutionPageItem[]> {
        try {
            setIsLoading(true);
            const { data } = await http.get<ExecutionPagination>(baseUrl, { params: { walletId, stockId } });
            return data?.items || [];
        } catch (error) {
            console.error('Error on fetch executions', error);
            return [];
        }
        finally {
            setIsLoading(false);
        }
    }
}

export function useExecutionContext() {
    return useContext(ExecutionContext)
}