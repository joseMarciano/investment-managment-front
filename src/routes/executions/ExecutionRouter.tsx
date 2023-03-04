import { RouteObject } from "react-router-dom";
import { ExecutionPage } from "../../components/execution/ExecutionPage";

const router: RouteObject = {
    path: '/execution/:walletId',
    element: <ExecutionPage />
}

export default router;