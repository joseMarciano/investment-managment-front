import { Outlet, RouteObject } from "react-router-dom";
import { ExecutionContextProvider } from '../../components/execution/context/ExecutionContext';
import { ExecutionPage } from '../../components/execution/ExecutionPage';
import AddExecutionRouter from '../execution/add/AddExecutionRouter';
import EditExecutionRouter from '../execution/edit/EditExecutionRouter';

const router: RouteObject = {
    path: '/executions/:walletId/:stockId',
    element: <ExecutionContextProvider>
        <ExecutionPage />
        <Outlet/>
    </ExecutionContextProvider>,
    children:[AddExecutionRouter, EditExecutionRouter]

}

export default router;