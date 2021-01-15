import { Reducer } from 'redux'
import produce from 'immer'
import { CartTypes, ICartState } from './types'

const INITIAL_STATE: ICartState = {
    data: [],
    failedStockCheck: [],
    loading:false,
    error:false,
}

const reducer: Reducer<ICartState> = (state = INITIAL_STATE, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case CartTypes.ADD_PRODUCT_TO_CART_SUCCESS: {
                const { product } = action.payload

                const productInCartIndex = draft.data.findIndex((item) => item.product.id === product.id)

                if (productInCartIndex >= 0) {
                    draft.data[productInCartIndex].quantity++
                } else {
                    draft.data.push({ product, quantity: 1 })
                }

                break
            }
            case CartTypes.ADD_PRODUCT_TO_CART_FAILURE: {
                draft.failedStockCheck.push(action.payload.productId)
                break
            }
            default: {
                return draft
            }
        }
    })
}

export default reducer
