import { LocalStorage } from 'ttl-localstorage';
import { StockPageItem, StockPagination } from '../model-types/StockTypes';
import http from '../config/http/axios';

const KEY_STOCK_STORAGE = 'KEY_STOCK_STORAGE'

export type UseLocalStorage = {
    loadStock: () => void,
    getStocks: () => StockPageItem[]
}

export function useLocalStorage(): UseLocalStorage {


    return {
        loadStock,
        getStocks
    }

    function loadStock() {
        if (LocalStorage.keyExists(KEY_STOCK_STORAGE)) return;

        http.get<StockPagination>('/stocks', {params: {limit: 10000}})
            .then(page => LocalStorage.put(KEY_STOCK_STORAGE, page?.data?.items || [], parseInt(process.env.REACT_APP_TTL_STOCK_STORAGE || '0')))

    }

    function getStocks(): StockPageItem[] {
        return LocalStorage.get(KEY_STOCK_STORAGE, []);
    }
}