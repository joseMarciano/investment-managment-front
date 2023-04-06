import { Outlet, RouteObject } from "react-router-dom";
import { WalletContextProvider } from '../../components/wallet/context/WalletContext';
import { WalletPage } from '../../components/wallet/WalletPage';
import AddWalletRouter from './add/AddWalletRouter';
import EditWalletRouter from './edit/EditWalletRouter';


const router: RouteObject = {
    path: '/wallet',
    element: <WalletContextProvider>
        <WalletPage />
        <Outlet />
    </WalletContextProvider>,
    children: [AddWalletRouter, EditWalletRouter]
}


export default router;