import { RouteObject } from "react-router-dom";
import { ExecutionModal } from '../../../components/execution/modal/ExecutionModal';

const router: RouteObject = {
    path: 'sell/:executionId',
    element: <ExecutionModal/>
}

export default router;