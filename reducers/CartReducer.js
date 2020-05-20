
const initialState = {
    total: 0,
    cartItem: [

    ],
}


const cartItem = (state = initialState.cartItem, action) => {
    switch (action.type) {
        case "ADD_TO_CART":
            if (state.some(item => item.id === action.payload.id)) {
                return state.map(item => (item.id === action.payload.id ? { ...item, qty: item.qty + 1, total: (item.qty + 1) * item.dish_price } : item));
            }
            return [...state, { ...action.payload, qty: 1, total: action.payload.dish_price }]
        case "REMOVE_FROM_CART":
            return state.map(item => (item.id === action.payload.id ? { ...item, qty: item.qty - 1, total: (item.qty - 1) * item.dish_price } : item))
                .filter(item => item.qty > 0);
        case "REMOVE_ONE":
            const index = state.findIndex(item => item.id === action.payload.id);
            return state.filter((_, i) => i !== index);
        default:
            return state;
    }
}
const total = (state = initialState.total, action) => {
    switch (action.type) {
        case "ADD_TO_CART":           
            return state += (action.payload.dish_price);

        case "REMOVE_FROM_CART":
            if (initialState.cartItem.length >= 0) {
                return state -= (action.payload.dish_price);
            } else {
                return state = 0
            }

        case "REMOVE_ONE":
            const qty2 = (action.payload.qty == undefined) ? 1 : action.payload.qty
            return state -= (action.payload.dish_price * qty2);
        default:
            return state;
    }
}


const cart = (state = initialState, action) => {
    switch (action.type) {
        case "CHECK_OUT":
            return initialState
        case "CHECKOUT_FAILURE":
            return action.cart
        default:
            return {
                cartItem: cartItem(state.cartItem, action),
                total: total(state.total, action)
            }
    }
}

export default cart
