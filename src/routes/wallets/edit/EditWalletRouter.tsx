import { RouteObject } from "react-router-dom";
import { WalletModal } from '../../../components/wallet/modal/WalletModal';

const router: RouteObject = {
    path: 'edit/:walletId',
    element: <WalletModal/>
}

export default router;