import { RouteObject } from "react-router-dom";
import { ExecutionContextProvider } from '../../components/execution/context/ExecutionContext';
import { ExecutionPage } from '../../components/execution/ExecutionPage';

const router: RouteObject = {
    path: '/executions/:walletId/:symbol',
    element: <ExecutionContextProvider>
        <ExecutionPage />
    </ExecutionContextProvider>

}

export default router;