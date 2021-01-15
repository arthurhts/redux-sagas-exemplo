import { action } from 'typesafe-actions'
import { ProductsTypes, IProduct } from './types'

export const loadProductsRequest = () => action(ProductsTypes.LOAD_REQUEST)

export const loadProductsSuccess = (data: IProduct[]) => action(ProductsTypes.LOAD_SUCCESS, data)

export const loadProductsFailure = () => action(ProductsTypes.LOAD_FAILURE)
