
export type ExecutionAggregateType = {
    stockId: string,
    symbol: string,
    totalCustodyQuantity: number
}

export type ExecutionPagination = {
    offset: number,
    limit: number,
    total: number,
    items: ExecutionPageItem[]
}

export type ExecutionPageItem = {
    id: string,
    originId: string,
    stockId: string,
    walletId: string,
    profitPercentage: number,
    executedQuantity: number,
    executedPrice: number,
    executedVolume: number,
    pnlOpen: number,
    pnlClose: number,
    status: string,
    executedAt: string,
    createdAt: string,
    updatedAt: string
}

export type Execution = {
    id: string,
    originId: string,
    stockId: string,
    walletId: string,
    profitPercentage: number,
    executedQuantity: number,
    executedPrice: number,
    executedVolume: number,
    status: string,
    executedAt: string,
    createdAt: string,
    updatedAt: string
}

export type ExecutionTotalizator = {
    totalSoldQuantity: number
    totalBoughtQuantity: number
    totalPnlOpen: number
    totalPnlClose: number
}
