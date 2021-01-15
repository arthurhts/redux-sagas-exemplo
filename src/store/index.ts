import { createStore, applyMiddleware, Store } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'

import rootReducer from './modules/rootReducer'

import { ICartState } from './modules/cart/types'
import rootSaga from './modules/rootSaga'
import { IProductsState } from './modules/products/types'

export interface IState {
    cart: ICartState
    products: IProductsState
}

const sagaMiddleware = createSagaMiddleware()

const middlewares = [sagaMiddleware]

const store: Store<IState> = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)))

sagaMiddleware.run(rootSaga)

export default store
