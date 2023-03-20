import { createContext, ReactNode, useContext, useEffect, useMemo } from "react"
import { useLocation, useNavigate } from 'react-router-dom';
import { UseResponsiveStatus, useResponsiveStatus } from '../../../../hooks/useResponsiveStatus';
import { useLocalStorage } from '../../../../hooks/useLocalStorage';
import { useToast } from '@chakra-ui/react';
import httpClient from '../../../../config/http/axios'
import { AxiosError, AxiosInstance } from 'axios';

type ApplicationContextProps = {
    responsiveStatus: UseResponsiveStatus,
    http: AxiosInstance
};
type ApplicationContextProviderProps = {
    children: ReactNode
};

const ApplicationContext = createContext({} as ApplicationContextProps)
export function ApplicationContextProvider({ children }: ApplicationContextProviderProps) {
    const toast = useToast();
    const location = useLocation();
    const navigate = useNavigate();
    const responsiveStatus = useResponsiveStatus();
    const http = useMemo(() => initHttpInterceptor(), []);
    const localStorage = useLocalStorage();




    useEffect(() => {
        localStorage.loadStock(http);
        if (isInRootRoute()) navigate('/wallet')
        // eslint-disable-next-line
    }, [])

    return (
        <ApplicationContext.Provider value={{ http, responsiveStatus }}>
            {children}
        </ApplicationContext.Provider>
    )


    function isInRootRoute(): boolean {
        return location.pathname === '/';
    }

    function initHttpInterceptor() {
        httpClient.interceptors.response.clear();
        httpClient.interceptors.response.use((value) => value, errorInterceptor);


        return httpClient;
    }

    function errorInterceptor(error: AxiosError<any, any>) {
        console.warn('Deu ruim');
        debugger
        if (error?.response?.status === 422) {
            toast({
                position: 'bottom-right',
                status: 'info',
                title: 'Erro de validação',
                description: error.response.data?.errors[0]?.message
            });

            return Promise.reject(error);
        }


        toast({
            position: 'bottom-right',
            status: 'error',
            title: 'Erro',
            description: 'Ocorreu um erro interno no servidor.'
        });


        return Promise.reject(error);
    }
}

export function useApplicationContext() {
    return useContext(ApplicationContext)
}