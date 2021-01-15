import { action } from 'typesafe-actions'
import { ProductsTypes, IProduct } from './types'

export const loadProductsRequest = () => action(ProductsTypes.LOAD_REQUEST)

export const loadProductsSuccess = (product: IProduct[]) => action(ProductsTypes.LOAD_SUCCESS, {product})

export const loadProductsFailure = () => action(ProductsTypes.LOAD_FAILURE)
