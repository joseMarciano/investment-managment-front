import { Outlet, RouteObject } from "react-router-dom";
import { ExecutionSummaryPage } from "../../components/execution/ExecutionSummaryPage";
import { ExecutionSummaryContextProvider } from '../../components/execution/context/ExecutionSummaryContext';
import AddExecutionRouter from '../execution/add/AddExecutionRouter';

const router: RouteObject = {
    path: '/execution-summary/:walletId',
    element: <ExecutionSummaryContextProvider>
        <ExecutionSummaryPage />
        <Outlet />
    </ExecutionSummaryContextProvider>,
    children: [AddExecutionRouter]
}

export default router;