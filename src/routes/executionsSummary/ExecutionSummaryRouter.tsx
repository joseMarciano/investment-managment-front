import { Outlet, RouteObject } from "react-router-dom";
import { ExecutionSummaryPage } from "../../components/execution/ExecutionSummaryPage";
import { ExecutionContextProvider } from '../../components/execution/context/ExecutionContext';
import ExecutionRouter from '../execution/ExecutionRouter';

const router: RouteObject = {
    path: '/execution-summary/:walletId',
    element: <ExecutionContextProvider>
        <ExecutionSummaryPage />
    </ExecutionContextProvider>
}

export default router;