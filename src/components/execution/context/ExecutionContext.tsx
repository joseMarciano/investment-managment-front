import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react"
import { useParams } from 'react-router-dom';
import { Loader } from '../../commons/loader/Loader';
import { ExecutionAggregateType } from '../../../model-types/ExecutionTypes';
import { ExecutionModal } from '../modal/ExecutionModal';
import { useDisclosure, UseDisclosureReturn } from '@chakra-ui/react';
import http from '../../../config/http/axios';

type ExecutionContextProps = {
    executionsSummary: ExecutionAggregateType[],
    search: () => Promise<void>,
    isLoading: boolean,
    modalDisclosure: UseDisclosureReturn
};

type ExecutionContextProviderProps = {
    children: ReactNode
};

const ExecutionContext = createContext({} as ExecutionContextProps)

export function ExecutionContextProvider({ children }: ExecutionContextProviderProps) {
    const { walletId } = useParams();
    const baseUrl = useMemo(() => `executions/summary/${walletId}`, [walletId]);
    const [executionsSummary, setExecutionsSummary] = useState<ExecutionAggregateType[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const modalDisclosure = useDisclosure({ id: 'Execution-Modal' , onClose: () => search()});
    let currentExecution = null as unknown as string;

    useEffect(() => {
        search();
    }, [])

    return (
        <ExecutionContext.Provider value={{ executionsSummary, isLoading, search, modalDisclosure }}>
            {children}
            <ExecutionModal id={useMemo(() => currentExecution, [currentExecution])} disclosure={modalDisclosure} />
            <Loader isLoading={isLoading} />
        </ExecutionContext.Provider>
    )

    async function search() {
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

export function useExecutionContext() {
    return useContext(ExecutionContext)
}