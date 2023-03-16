import { AsyncSelect } from 'chakra-react-select';
import { useMemo, useState } from 'react';
import { useLocalStorage } from '../../../../hooks/useLocalStorage';
import { StockPageItem } from '../../../../model-types/StockTypes';

type SelectStockProps = {
    setStock: (stock: StockSelectFormat) => void
    stock: StockSelectFormat,
    isDisabled?: boolean
}

type StockSelectFormat = {
    value: string
    label: string
}

export function SelectStock({ setStock, stock, isDisabled }: SelectStockProps) {
    const { getStocks } = useLocalStorage();
    const [defaultLimit, setDefaultLimit] = useState(300);
    const stocks = useMemo(() => getStocks().slice(0, defaultLimit).map(buildItem), [defaultLimit])

    return <AsyncSelect
        className='react-select-container'
        classNamePrefix='react-select'
        useBasicStyles
        defaultOptions={stocks}
        options={stocks}
        isDisabled={isDisabled}
        value={stock}
        onChange={(it) => setStock(it as StockSelectFormat)}
        onMenuScrollToBottom={() => setDefaultLimit(defaultLimit + 300)}
        onMenuClose={() => setDefaultLimit(300)}
        cacheOptions
        loadOptions={searchItem}
    />

    function buildItem(stock: StockPageItem) {
        return {
            value: stock.id,
            label: stock.symbol
        }
    }

    function searchItem(inputValue: any, callback: any) {
        const values = getStocks().map(buildItem).filter((i) =>
            i.label.toLowerCase().includes(inputValue.toLowerCase())
        );
        callback(values);
    }

}