import { CHATLIST_CONVO_GET, CHATLIST_CONVO_GETFAIL, CHATLIST_CONVO_REQUEST, CHATLIST_CONVO_CREATEFAIL, CHATLIST_CONVO_CREATE } from "../constants/chatConstant"

export const chatListReducers = (state = { message:"", chatList: [] }, action) => {
    switch (action.type) {
        case CHATLIST_CONVO_REQUEST:
            return { loading: true }
        case CHATLIST_CONVO_GET:
            return { loading: false, chatList: action.payload }
        case CHATLIST_CONVO_CREATE:
            return { loading: false, message: CHATLIST_CONVO_CREATE }
        case CHATLIST_CONVO_GETFAIL:
            return { loading: false, error: action.payload }
        case CHATLIST_CONVO_CREATEFAIL:
            return { loading: false, error: action.payload }
        default:
            return state

    }

}