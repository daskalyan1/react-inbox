import { combineReducers } from 'redux'
import { MESSAGES_RECEIVED, MESSAGE_SENT, MESSAGE_STARRED, MESSAGE_CHECKED, MESSAGE_READ, MESSAGE_UNREAD, MESSAGE_DELETED, MESSAGE_LABELED, MESSAGE_UNLABELED, MESSAGE_CHECKUNCHECK_ALL} from '../actions'

const initialState = {
    composeFormOpenState:false,
    messages:[]
}

function messages(state = initialState, action) {
    switch(action.type) {
        case MESSAGES_RECEIVED:
            return {
                ...state,
                messages: [...action.messageItems.map(messageItem => {messageItem.selected = false; return messageItem})]
            }
        case MESSAGE_SENT:
            return [
                ...state,
                {
                    ...action.message,
                    selected: false
                }
            ]
        case MESSAGE_STARRED:
            console.log('Messages8', state)
            const messageItems1 = state.messages
            action.starred ? messageItems1[messageItems1.findIndex(e => (e.id.toString() === action.id.toString()))].starred = false : messageItems1[messageItems1.findIndex(e => (e.id.toString() === action.id.toString()))].starred = true
            console.log('message item', messageItems1)
            return {
                ...state,
                messages: [...messageItems1]
            }
        case MESSAGE_CHECKED:
            state[state.findIndex(e => (e.id.toString() ===action.id.toString()))].selected=action.checked
            return [...state]
        case MESSAGE_READ:
            state.map(messageItem => {if (messageItem.selected === true) {messageItem.read=true}})
            return [...state]
        case MESSAGE_UNREAD:
            state.map(messageItem => {if (messageItem.selected === true) {messageItem.read=false}})
            return [...state]
        case MESSAGE_DELETED:
            return [...state.filter(messageItem => messageItem.selected === false)]
        case MESSAGE_LABELED:
            state.map(messageItem => {
                if (messageItem.selected === true){
                    if (messageItem.labels.findIndex(e => (e === action.label)) === -1) messageItem.labels = messageItem.labels.concat(action.label)
                }
            })
            return [...state]
        case MESSAGE_UNLABELED:
            state.map(messageItem => {
                if (messageItem.selected === true){
                    let labelIndex = messageItem.labels.findIndex(e => (e === action.label))
                    if (labelIndex !== -1){
                       // console.log("Here", labelIndex)
                        messageItem.labels.splice(labelIndex, 1)
                    }
                }
            })
            return [...state]
        case MESSAGE_CHECKUNCHECK_ALL:
            const messageItems = state
            let totalItems = messageItems.length
            let checkedItems = messageItems.filter((messageItem) => messageItem.selected === true).length
            if (totalItems > 0){
                if (totalItems === checkedItems){
                    //unselect all
                    messageItems.map((messageItem) => messageItem.selected=false)
                }
                else{
                    if (checkedItems === 0){
                        //select All
                        messageItems.map((messageItem) => messageItem.selected=true)
                    }
                    else{
                        //select rest
                        messageItems.map((messageItem) => { if (messageItem.selected === false) messageItem.selected=true})
                    }
                }
            }
            return [...messageItems]
        default:
            return state
    }
}

export default combineReducers({
    messages
})