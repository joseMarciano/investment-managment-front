import { RouteObject } from "react-router-dom";
import { StockRadarContextProvider } from '../../components/stockRadar/context/StockRadarContext';
import { StockRadarPage } from '../../components/stockRadar/StockRadarPage';

const router: RouteObject = {
    path: '/stocks-radar',
    element: <StockRadarContextProvider>
        <StockRadarPage />
    </StockRadarContextProvider>
}


export default router;