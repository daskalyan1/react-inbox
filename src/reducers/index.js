import { combineReducers } from 'redux'
import { MESSAGES_RECEIVED, MESSAGE_SENT, MESSAGE_STARRED, MESSAGE_CHECKED, MESSAGE_READ, MESSAGE_UNREAD, MESSAGE_DELETED, MESSAGE_LABELED, MESSAGE_UNLABELED, MESSAGE_CHECKUNCHECK_ALL, MESSAGE_CREATE_FORM_OPEN_CLOSE} from '../actions'

const initialState = {
    composeFormOpenState:false,
    messages:[]
}

function messages(state = initialState, action) {
    switch(action.type) {
        case MESSAGES_RECEIVED:
            const messagesReceived = action.messageItems.map(messageItem => {
                return {
                    ...messageItem,
                    selected:false
                }
            })
            return {
                ...state,
                messages: [...messagesReceived]
            }
        case MESSAGE_SENT:
            const newMessageArray = [
                ...state.messages,
                {
                    ...action.message,
                    selected: false
                }
            ]
            return {
                composeFormOpenState:false,
                messages: [...newMessageArray]
            }
        case MESSAGE_STARRED:
            const newMessageState = state.messages.map(messageItem => {
                    if (messageItem.id !== action.id)
                        return messageItem
                    else
                    {
                        if (messageItem.starred === true) {
                            return {
                                ...messageItem,
                                starred:false
                            }
                        }
                        else{
                            return {
                                ...messageItem,
                                starred:true
                            }
                        }
                    }
                })
            return {
                ...state,
                messages: [...newMessageState]
            }
        case MESSAGE_CHECKED:
            const checkedUncheckedMessages = state.messages.map(messageItem => {
                if (messageItem.id === action.id) {
                    console.log("checkedMessageItem", messageItem)
                    return {
                        ...messageItem,
                        selected: action.checked
                    }
                }
                else
                    return messageItem
            })
            return {
                ...state,
                messages: [...checkedUncheckedMessages]
            }
        case MESSAGE_READ:
             const readMessages = state.messages.map(messageItem => {
                 if (messageItem.selected === true) {
                     return {
                         ...messageItem,
                         read:true
                     }
                 }
                 else
                     return messageItem
             })
            return {
                ...state,
                messages: [...readMessages]
            }
        case MESSAGE_UNREAD:
            const unreadMessages = state.messages.map(messageItem => {
                if (messageItem.selected === true) {
                    return {
                        ...messageItem,
                        read:false
                    }
                }
                else
                    return messageItem
            })
            return {
                ...state,
                messages: [...unreadMessages]
            }
        case MESSAGE_DELETED:
            return {
                ...state,
                messages: [...state.messages.filter(messageItem => messageItem.selected === false)]
            }
        case MESSAGE_LABELED:
            const labeledMessages = state.messages.map(messageItem => {
                if (messageItem.selected === true){
                    if (messageItem.labels.findIndex(e => (e === action.label)) === -1) {
                        return {
                            ...messageItem,
                            labels:[...messageItem.labels.concat(action.label)]
                        }
                    }
                    else
                        return messageItem
                }
                else
                    return messageItem
            })
            return {
                ...state,
                messages:[...labeledMessages]
            }
        case MESSAGE_UNLABELED:
            const unlabeledMessages = state.messages.map(messageItem => {
                if (messageItem.selected === true){
                    let labelIndex = messageItem.labels.findIndex(e => (e === action.label))
                    if (labelIndex !== -1){
                        messageItem.labels.splice(labelIndex, 1)
                       return{
                           ...messageItem,
                           labels: [...messageItem.labels]
                       }
                    }
                    else
                        return messageItem
                }
                else
                    return messageItem
            })
            return {
                ...state,
                messages:[...unlabeledMessages]
            }
        case MESSAGE_CHECKUNCHECK_ALL:
            let checkUncheckAllMessages
            const checkUncheckAllMessageItems = state.messages
            let totalItems = checkUncheckAllMessageItems.length
            let checkedItems = checkUncheckAllMessageItems.filter((messageItem) => messageItem.selected === true).length
            if (totalItems > 0){
                if (totalItems === checkedItems){
                    //unselect all
                    checkUncheckAllMessages = checkUncheckAllMessageItems.map((messageItem) => {
                        return{
                            ...messageItem,
                            selected:false
                        }
                    })
                }
                else{
                    if (checkedItems === 0){
                        //select All
                        checkUncheckAllMessages = checkUncheckAllMessageItems.map((messageItem) => {
                            return {
                                ...messageItem,
                                selected:true
                            }
                        })
                    }
                    else{
                        //select rest
                        checkUncheckAllMessages = checkUncheckAllMessageItems.map((messageItem) => {
                            if (messageItem.selected === false) {
                                //messageItem.selected=true
                                return {
                                    ...messageItem,
                                    selected:true
                                }
                            }
                            else
                                return messageItem
                        })
                    }
                }
            }
            return {
                ...state,
                messages: [...checkUncheckAllMessages]
            }
        case MESSAGE_CREATE_FORM_OPEN_CLOSE:
            if (state.composeFormOpenState === true){
                return {
                    ...state,
                    composeFormOpenState:false
                }
            }
            else {
                return {
                    ...state,
                    composeFormOpenState: true
                }
            }
        default:
            return state
    }
}

export default combineReducers({
    messages
})