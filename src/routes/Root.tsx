import { Box, HStack } from "@chakra-ui/react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { Menu } from "../components/menu/Menu";
import { ApplicationContextProvider } from "../context/ApplicationContext";

/**
 * ROUTES
 */
import ExecutionRouter from './executions/ExecutionRouter';
import WalletRouter from './wallets/WalletRouter';


const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children: [WalletRouter, ExecutionRouter]
    }
])

function Main() {
    return <ApplicationContextProvider>
        <HStack >
            <Menu />
            <Box height={'100vh'} flex={'1'} m={'0'}> <Outlet /></Box>,
        </HStack>
    </ApplicationContextProvider>
}

export function Root() {
    return <RouterProvider router={router} />

}