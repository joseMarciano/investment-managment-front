import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react"
import { useParams } from 'react-router-dom';
import { Loader } from '../../commons/loader/Loader';
import { ExecutionAggregateType } from '../../../model-types/ExecutionTypes';
import { ExecutionModal } from '../modal/ExecutionModal';
import { useDisclosure, UseDisclosureReturn } from '@chakra-ui/react';
import { useApplicationContext } from '../../commons/application/context/ApplicationContext';

type ExecutionSummaryContextProps = {
    executionsSummary: ExecutionAggregateType[],
    setExecutionsSummary: (executionsSummary: ExecutionAggregateType[]) => void,
    searchExecutionSummary: () => Promise<void>,
    isLoading: boolean
};

type ExecutionSummaryContextProviderProps = {
    children: ReactNode
};

const ExecutionSummaryContext = createContext({} as ExecutionSummaryContextProps)

export function ExecutionSummaryContextProvider({ children }: ExecutionSummaryContextProviderProps) {
    const { walletId } = useParams();
    const { http } = useApplicationContext();
    const baseUrl = useMemo(() => `executions/summary/${walletId}`, [walletId]);
    const [executionsSummary, setExecutionsSummary] = useState<ExecutionAggregateType[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        searchExecutionSummary();
    }, [])

    return (
        <ExecutionSummaryContext.Provider value={{ executionsSummary, isLoading, searchExecutionSummary, setExecutionsSummary }}>
            {children}
            <Loader isLoading={isLoading} />
        </ExecutionSummaryContext.Provider>
    )

    async function searchExecutionSummary() {
        setIsLoading(true);
        getExecutionsSummary()
            .then((data) => setExecutionsSummary(data ?? []))
            .catch((e) => console.error('Error on fetch executions summary', e))
            .finally(() => setIsLoading(false))
    }

    async function getExecutionsSummary(): Promise<ExecutionAggregateType[]> {
        try {
            setIsLoading(true);
            const { data } = await http.get<ExecutionAggregateType[]>(baseUrl);
            return data || [];
        } catch (error) {
            console.error('Error on fetch executions summary', error);
            return [];
        }
        finally {
            setIsLoading(false);
        }
    }
}

export function useExecutionSummaryContext() {
    return useContext(ExecutionSummaryContext)
}