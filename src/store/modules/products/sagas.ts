import { AxiosResponse } from 'axios'
import { call, put, all, takeLatest, delay } from 'redux-saga/effects'
import api from '../../../services/api'
import { loadProductsSuccess, loadProductsFailure } from './actions'
import { IProduct, ProductsTypes } from './types'

export function* load() {
    try {

        yield delay(3000)
        const response: AxiosResponse<IProduct[]> = yield call(api.get, '/products')
        yield put(loadProductsSuccess(response.data))
        
    } catch (error) {
        yield put(loadProductsFailure())
    }
}

export default all([takeLatest(ProductsTypes.LOAD_REQUEST, load)])
