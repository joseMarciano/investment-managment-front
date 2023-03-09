import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react"
import { useParams } from 'react-router-dom';
import { Loader } from '../components/commons/loader/Loader';
import { ExecutionAggregateType } from '../model-types/ExecutionTypes';
import { useApplicationContext } from './ApplicationContext';

type ExecutionContextProps = {
    executionsSummary: ExecutionAggregateType[]
};

type ExecutionContextProviderProps = {
    children: ReactNode
};

const ExecutionContext = createContext({} as ExecutionContextProps)

export function ExecutionContextProvider({ children }: ExecutionContextProviderProps) {
    const { walletId } = useParams();
    const baseUrl = useMemo(() => `executions/summary/${walletId}`, [walletId]);
    const { http } = useApplicationContext();
    const [executionsSummary, setExecutionsSummary] = useState<ExecutionAggregateType[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const getExecutionsSummary = async () => {
        try {
            setIsLoading(true);
            const { data } = await http.get<ExecutionAggregateType[]>(baseUrl);
            return data || [];
        } catch (error) {
            console.error('Error on fetch executions summary', error);
        }
        finally{
            setIsLoading(false);
        }
    }

    useEffect(() => {
        setIsLoading(true);
        getExecutionsSummary()
            .then((data) => setExecutionsSummary(data ?? []))
            .catch((e) => console.error('Error on fetch executions summary', e))
            .finally(() => setIsLoading(false))
    }, [])


    return (
        <ExecutionContext.Provider value={{ executionsSummary }}>
            {children}
            <Loader isLoading={isLoading} />
        </ExecutionContext.Provider>
    )
}

export function useExecutionContext() {
    return useContext(ExecutionContext)
}