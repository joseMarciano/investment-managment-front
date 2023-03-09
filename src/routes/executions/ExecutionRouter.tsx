import { RouteObject } from "react-router-dom";
import { ExecutionPage } from "../../components/execution/ExecutionPage";
import { ExecutionContextProvider } from '../../components/execution/context/ExecutionContext';

const router: RouteObject = {
    path: '/execution/:walletId',
    element: <ExecutionContextProvider>
        <ExecutionPage />
    </ExecutionContextProvider>
}

export default router;