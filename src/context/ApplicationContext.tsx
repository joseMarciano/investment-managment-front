import { createContext, ReactNode, useContext, useEffect } from "react"
import { useLocation, useNavigate } from 'react-router-dom';
import { UseResponsiveStatus, useResponsiveStatus } from '../hooks/useResponsiveStatus';


type ApplicationContextProps = {
    responsiveStatus: UseResponsiveStatus
};
type ApplicationContextProviderProps = {
    children: ReactNode
};

const ApplicationContext = createContext({} as ApplicationContextProps)

export function ApplicationContextProvider({ children }: ApplicationContextProviderProps) {
    const location = useLocation();
    const navigate = useNavigate();
    const responsiveStatus = useResponsiveStatus();

    useEffect(() => {
        if (isInRootRoute()) navigate('/wallet')
        // eslint-disable-next-line
    }, [])

    return (
        <ApplicationContext.Provider value={{responsiveStatus}}>
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