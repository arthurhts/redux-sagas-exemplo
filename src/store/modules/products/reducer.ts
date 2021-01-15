import produce from 'immer'
import { Reducer } from 'redux'
import { IProductsState, ProductsTypes } from './types'

const INITIAL_STATE: IProductsState = {
    data: [],
    loading: false,
    error: false
}

const cart: Reducer<IProductsState> = (state = INITIAL_STATE, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case ProductsTypes.LOAD_REQUEST: {
                draft.loading = true
                draft.error = false

                break
            }
            case ProductsTypes.LOAD_SUCCESS: {
                draft.loading = false
                draft.error = false
                draft.data = action.payload
                break
            }
            case ProductsTypes.LOAD_FAILURE: {
                draft.loading = false
                draft.error = true

                break
            }
            default: {
                return draft
            }
        }
    })
}

export default cart
