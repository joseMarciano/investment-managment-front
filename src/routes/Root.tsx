import { Box, HStack } from "@chakra-ui/react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { Menu } from "../components/menu/Menu";
import { ApplicationContextProvider } from "../components/commons/application/context/ApplicationContext";

/**
 * ROUTES
 */
import ExecutionSummaryRouter from './executionsSummary/ExecutionSummaryRouter';
import WalletRouter from './wallets/WalletRouter';
import ExecutionRouter from './execution/ExecutionRouter';


const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children: [WalletRouter, ExecutionSummaryRouter, ExecutionRouter]
    }
])

function Main() {
    return <ApplicationContextProvider>
        <HStack >
            <Menu />
            <Box padding='0 16px' height={'100vh'} flex={'1'} m={'0'}> <Outlet /></Box>,
        </HStack>
    </ApplicationContextProvider>
}

export function Root() {
    return <RouterProvider router={router} />

}