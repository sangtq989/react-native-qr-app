import { combineReducers, createStore } from 'redux'
import CartReducer from '../reducers/CartReducer'
import cart, * as fromCart from '../reducers/CartReducer'

const store = createStore(
    cart,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
export default store