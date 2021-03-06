export default function order(state = {}, action) {
    switch (action.type) {
        case "GETORDERS_SUCCESS":
            return { orders: action.orders };
        case "GETORDERITEMS_SUCCESS":
            return { orderItems: action.orderItems };
        case "GETSELLER_SUCCESS":
            return { ...state, seller: action.seller };
        case "GETORDER_SUCCESS":
            return { ...state, order: action.order };
        case "DELETEORDER_SUCCESS":
            return { orders: action.orders };
        case "ADDORDER_SUCCESS":
            return { ...state };
        case "UPDATEORDER_SUCCESS":
            return { order: action.order };
        default:
            return { order: action.order };
    }
}