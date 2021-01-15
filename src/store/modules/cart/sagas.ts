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
    vou verifiacr em meu estado atual usando SELECT do redux saga e ver se esse produto já está no carrinho
    caso ele já esteja vou retornar a quantidade 
    */
    const currentQuantity: number = yield select((state: IState) => {
        return state.cart.items.find((item: ICartItem) => item.product.id === product.id)?.quantity ?? 0
    })

    //Aqui faço uma chamada assincrona na API para ver o estoque
    const avaibleStockResponse: AxiosResponse<IStockResponse> = yield call(api.get, `stock/${product.id}`)

    //Usamos o PUT que é equivalente ao DISPATH do redux para continuar o fluxo
    if (avaibleStockResponse.data.quantity > currentQuantity) {
        yield put(addProductToCartSuccess(product))
        console.log('deu certo')
    } else {
        yield put(addProductToCartFailure(product.id))
        console.log('falta de estoque')
    }
}

export default all([takeLatest(CartTypes.ADD_PRODUCT_TO_CART_REQUEST, checkProductStock)])
