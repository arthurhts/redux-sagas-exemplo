import { action } from 'typesafe-actions'
import { IProduct } from '../products/types'
import { CartTypes } from './types'

export const addProductToCartRequest = (product: IProduct) => action(CartTypes.ADD_PRODUCT_TO_CART_REQUEST, {product})

export const addProductToCartSuccess = (product: IProduct) => action(CartTypes.ADD_PRODUCT_TO_CART_SUCCESS, {product})

export const addProductToCartFailure = (productId: number) => action(CartTypes.ADD_PRODUCT_TO_CART_FAILURE, {productId})
