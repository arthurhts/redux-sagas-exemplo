import { all } from 'redux-saga/effects'

import cart from './cart/sagas'
import products from './products/sagas'

export default function* rootSaga(): any {
    return yield all([cart, products])
}
