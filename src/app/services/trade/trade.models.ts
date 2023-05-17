export interface PriceConversionResponse {
    data: {
        amount: string,
        id: number,
        last_updated: string,
        name: string,
        quote: any          //  redo it
    }
}

export interface TradeWithMasterResponse {
    msg: string
}