import { createContext, ReactNode, useContext, useEffect } from "react"
import { useLocation, useNavigate } from 'react-router-dom';
import { UseResponsiveStatus, useResponsiveStatus } from '../../../../hooks/useResponsiveStatus';
import { useLocalStorage } from '../../../../hooks/useLocalStorage';

type ApplicationContextProps = {
    responsiveStatus: UseResponsiveStatus,
};
type ApplicationContextProviderProps = {
    children: ReactNode
};

const ApplicationContext = createContext({} as ApplicationContextProps)
export function ApplicationContextProvider({ children }: ApplicationContextProviderProps) {
    const localStorage = useLocalStorage();
    const location = useLocation();
    const navigate = useNavigate();
    const responsiveStatus = useResponsiveStatus();

    useEffect(() => {
        localStorage.loadStock();
        if (isInRootRoute()) navigate('/wallet')
        // eslint-disable-next-line
    }, [])

    return (
        <ApplicationContext.Provider value={{ responsiveStatus }}>
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