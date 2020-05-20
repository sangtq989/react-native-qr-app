
export const addToCartUnsafe = payload => ({
    type: "ADD_TO_CART",
    payload
})

export const removeFromCart = (payload) => ({
    type: "REMOVE_FROM_CART",
    payload
});
export const remove1FromCart = (payload) => ({
    type: "REMOVE_ONE",
    payload
});

export const checkout = (data) => ({
    type :'CHECK_OUT',
    data
})