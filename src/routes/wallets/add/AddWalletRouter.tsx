import { RouteObject } from "react-router-dom";
import { WalletModal } from '../../../components/wallet/modal/WalletModal';

const router: RouteObject = {
    path: 'add',
    element: <WalletModal/>
}

export default router;