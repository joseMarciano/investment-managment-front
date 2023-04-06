

export type WalletPagination = {
    offset: number,
    limit: number,
    total: number,
    items: WalletPageItem[]
}

export type WalletPageItem = {
    id: string,
    name: string,
    description: string,
    color: string
}

export type Wallet = {
    id: string,
    name: string,
    description: string,
    color: string,
    createdAt: string,
    updatedAt: string
}
