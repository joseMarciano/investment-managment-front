export type StockPagination = {
    offset: number, 
    limit: number, 
    total: number, 
    items: StockPageItem[]
}

export type StockPageItem = {
    id: string,
    symbol: string
}
