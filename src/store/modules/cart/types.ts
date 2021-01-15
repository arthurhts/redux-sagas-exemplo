import { IProduct } from '../products/types'

//ACTIONS TYPES
export enum CartTypes {
    ADD_PRODUCT_TO_CART_REQUEST = '@cart/ADD_PRODUCT_TO_CART_REQUEST',
    ADD_PRODUCT_TO_CART_SUCCESS = '@cart/ADD_PRODUCT_TO_CART_SUCCESS',
    ADD_PRODUCT_TO_CART_FAILURE = '@cart/ADD_PRODUCT_TO_CART_FAILURE'
}

//DATA TYPES
export interface ICartItem {
    product: IProduct
    quantity: number
}

//STATE TYPES
export interface ICartState {
    readonly data: ICartItem[]
    readonly loading: boolean
    readonly error: boolean
    readonly failedStockCheck: number[]
}
