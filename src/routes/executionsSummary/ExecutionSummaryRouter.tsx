import { Outlet, RouteObject } from "react-router-dom";
import { ExecutionSummaryPage } from "../../components/execution/ExecutionSummaryPage";
import { ExecutionSummaryContextProvider } from '../../components/execution/context/ExecutionSummaryContext';
import ExecutionRouter from '../execution/ExecutionRouter';

const router: RouteObject = {
    path: '/execution-summary/:walletId',
    element: <ExecutionSummaryContextProvider>
        <ExecutionSummaryPage />
    </ExecutionSummaryContextProvider>
}

export default router;