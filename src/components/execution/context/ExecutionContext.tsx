import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react"
import { useLocation, useParams } from 'react-router-dom';
import { Loader } from '../../commons/loader/Loader';
import { ExecutionPagination, ExecutionPageItem, Execution, ExecutionTotalizator } from '../../../model-types/ExecutionTypes';
import { ExecutionModal } from '../modal/ExecutionModal';
import { useDisclosure, UseDisclosureReturn } from '@chakra-ui/react';
import { useApplicationContext } from '../../commons/application/context/ApplicationContext';

type ExecutionContextProps = {
    executions: ExecutionPageItem[],
    setExecutions: (executions: ExecutionPageItem[]) => void,
    searchExecutions: () => Promise<void>,
    deleteExecution: (executionId: string) => Promise<void>,
    findExecutionById: (executionId: string) => Promise<Execution>,
    executionsTotalizator: ExecutionTotalizator,
    searchExecutionsTotalizator: () => Promise<void>,
    setExecutionsTotalizator: (totalizator: ExecutionTotalizator) => void,
    isLoading: boolean
};

type ExecutionContextProviderProps = {
    children: ReactNode
};

const ExecutionContext = createContext({} as ExecutionContextProps)

export function ExecutionContextProvider({ children }: ExecutionContextProviderProps) {
    const { walletId, stockId } = useParams();
    const { http } = useApplicationContext();
    const baseUrl = useMemo(() => `executions`, []);
    const [executions, setExecutions] = useState<ExecutionPageItem[]>([]);
    const [executionsTotalizator, setExecutionsTotalizator] = useState<ExecutionTotalizator>(null as unknown as ExecutionTotalizator);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        searchExecutions();
        searchExecutionsTotalizator();
    }, [])

    return (
        <ExecutionContext.Provider value={{ searchExecutionsTotalizator, executionsTotalizator, setExecutionsTotalizator, setExecutions, executions, isLoading, searchExecutions, deleteExecution, findExecutionById }}>
            {children}
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

    async function searchExecutionsTotalizator() {
        setIsLoading(true);
        getExecutionsTotalizator()
            .then((data) => setExecutionsTotalizator(data))
            .catch((e) => console.error('Error on fetch executions totalizer', e))
            .finally(() =>  setIsLoading(false));
    }

    async function deleteExecution(executionId: string): Promise<void> {
        setIsLoading(true);
        return http.delete(`${baseUrl}/${executionId}`)
            .then(searchExecutions)
            .catch((e) => console.error(`Error on delete execution ${executionId}`, e))
            .finally(() => setIsLoading(false))
    }

    async function getExecutions(): Promise<ExecutionPageItem[]> {
        try {
            setIsLoading(true);
            const { data } = await http.get<ExecutionPagination>(baseUrl, { params: { walletId, stockId: stockId } });
            return data?.items || [];
        } catch (error) {
            console.error('Error on fetch executions', error);
            return [];
        }
        finally {
            setIsLoading(false);
        }
    }

    async function getExecutionsTotalizator(): Promise<any> {
        try {
            const { data } = await http.get<ExecutionTotalizator>(`${baseUrl}/totalizator`, { params: { walletId, stockId: stockId } });
            return data || null;
        } catch (error) {
            console.error('Error on fetch executions', error);
            return null;
        }
    }

    async function findExecutionById(executionId: string): Promise<Execution> {
        try {
            const { data } = await http.get<Execution>(`${baseUrl}/${executionId}`);
            return data;
        } catch (error) {
            throw new Error('Error on fetch executions', { cause: error })
        }
    }
}

export function useExecutionContext() {
    return useContext(ExecutionContext)
}