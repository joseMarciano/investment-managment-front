import { Outlet, RouteObject } from "react-router-dom";
import { ExecutionContextProvider } from '../../components/execution/context/ExecutionContext';
import { ExecutionPage } from '../../components/execution/ExecutionPage';
import AddExecutionRouter from '../execution/add/AddExecutionRouter';

const router: RouteObject = {
    path: '/executions/:walletId/:stockId',
    element: <ExecutionContextProvider>
        <ExecutionPage />
        <Outlet/>
    </ExecutionContextProvider>,
    children:[AddExecutionRouter]

}

export default router;