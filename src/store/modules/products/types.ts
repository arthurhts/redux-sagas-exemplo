//ACTIONS TYPES
export enum ProductsTypes {
    LOAD_REQUEST = '@products/LOAD_REQUEST',
    LOAD_SUCCESS = '@products/LOAD_SUCCESS',
    LOAD_FAILURE = '@products/LOAD_FAILURE'
}

//DATA TYPES
export interface IProduct {
    id: number
    title: string
    price: number
}

//STATE TYPE
export interface IProductsState {
    readonly data: IProduct[]
    readonly loading: boolean
    readonly error: boolean
}
