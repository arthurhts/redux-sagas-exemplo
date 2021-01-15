import { all, takeLatest, select, call, put } from 'redux-saga/effects'
import { addProductToCartFailure, addProductToCartRequest, addProductToCartSuccess } from './actions'
import { CartTypes, ICartItem } from './types'
import { IState } from '../..'
import { AxiosResponse } from 'axios'
import api from '../../../services/api'

type CheckProductStockRequest = ReturnType<typeof addProductToCartRequest>

interface IStockResponse {
    id: number
    quantity: number
}

function* checkProductStock({ payload }: CheckProductStockRequest) {
    const { product } = payload

    /*Estou recebendo um produto para adicionar no carrinho interceptei a action, abaixo
    vou verificar em meu estado atual usando SELECT do redux saga e ver se esse produto já está no carrinho
    caso ele já esteja vou retornar a quantidade 
    */
    const currentQuantity: number = yield select((state: IState) => {
        return state.cart.data.find((item: ICartItem) => item.product.id === product.id)?.quantity ?? 0
    })

    //Aqui faço uma chamada assíncrona na API para ver o estoque
    const availableStockResponse: AxiosResponse<IStockResponse> = yield call(api.get, `stock/${product.id}`)

    //Usamos o PUT que é equivalente ao DISPATCH do redux para continuar o fluxo
    if (availableStockResponse.data.quantity > currentQuantity) {
        //Com Estoque
        yield put(addProductToCartSuccess(product))
    } else {
        //Sem Estoque
        yield put(addProductToCartFailure(product.id))
    }
}

export default all([takeLatest(CartTypes.ADD_PRODUCT_TO_CART_REQUEST, checkProductStock)])
