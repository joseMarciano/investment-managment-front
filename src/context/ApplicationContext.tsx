import { createContext, ReactNode, useContext, useEffect, useMemo } from "react"
import { useLocation, useNavigate } from 'react-router-dom';
import { UseResponsiveStatus, useResponsiveStatus } from '../hooks/useResponsiveStatus';
import httpClient from '../config/http/axios';
import { AxiosInstance } from 'axios';
import { Spinner } from '@chakra-ui/react';

type ApplicationContextProps = {
    responsiveStatus: UseResponsiveStatus,
    http: AxiosInstance
};
type ApplicationContextProviderProps = {
    children: ReactNode
};

const ApplicationContext = createContext({} as ApplicationContextProps)

export function ApplicationContextProvider({ children }: ApplicationContextProviderProps) {
    const location = useLocation();
    const navigate = useNavigate();
    const responsiveStatus = useResponsiveStatus();
    const http = useMemo(() => httpClient, []);

    useEffect(() => {
        if (isInRootRoute()) navigate('/wallet')
        // eslint-disable-next-line
    }, [])

    return (
        <ApplicationContext.Provider value={{ responsiveStatus, http }}>
            {children}
        </ApplicationContext.Provider>
    )


    function isInRootRoute(): boolean {
        return location.pathname === '/';
    }
}

export function useApplicationContext() {
    return useContext(ApplicationContext)
}