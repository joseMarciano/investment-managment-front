import { createContext, ReactNode, useContext, useEffect } from "react"
import { useLocation, useNavigate } from 'react-router-dom';


type ApplicationContextProps = {};
type ApplicationContextProviderProps = {
    children: ReactNode
};

const ApplicationContext = createContext({} as ApplicationContextProps)

export function ApplicationContextProvider({ children }: ApplicationContextProviderProps) {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (isInRootRoute()) navigate('/wallet')
        // eslint-disable-next-line
    }, [])

    return (
        <ApplicationContext.Provider value={{}}>
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