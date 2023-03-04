import { Box, HStack } from "@chakra-ui/react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { Menu } from "../components/menu/Menu";

/**
 * ROUTES
 */
import ExecutionRouter from './executions/ExecutionRouter';
import WalletRouter from './wallets/WalletRouter';


const router = createBrowserRouter([
    {
        path: '/',
        element: <HStack >
            <Menu />
            <Box height={'100vh'} flex={'1'} m={'0'}> <Outlet /></Box>,
        </HStack>,
        children: [WalletRouter, ExecutionRouter]
    }
])

export function Root() {
    return <RouterProvider router={router} />
}