export const GET_MESSAGE_REQUESTED = 'GetMessage_Requested'
export const MESSAGES_RECEIVED = 'Messages_RECIEVED'
export const getMessages = () => {
    return async (dispatch) => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/messages`)
        const json = await response.json()
        dispatch({
            type: MESSAGES_RECEIVED,
            messageItems:json._embedded.messages
        })
    }
}

export const MESSAGE_SENT = 'Message_SENT'
export const sendMessage = (message) => {

    return async (dispatch) => {

        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/messages`, {
            method: 'POST',
            body: JSON.stringify({
                subject: message.subject,
                body: message.body
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        const newMessage = await response.json()

        dispatch({
            type: MESSAGE_SENT,
            message: newMessage
        })
    }

}
export const MESSAGE_STARRED = 'Message_STARRED'
export const starUnStarMessage = (id, starred) => {

    return async (dispatch) => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/messages`, {
            method: 'PATCH',
            body: JSON.stringify({
                messageIds: [id],
                command: "star",
                star: starred ? false : true
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })

        dispatch({
            type: MESSAGE_STARRED,
            id:id,
            starred:starred
        })
    }
}

export const MESSAGE_CHECKED = 'Message_CHECKED'
export const checkUnCheckMessage = (id, checked) => {

    return async (dispatch) => {
        dispatch({
            type:MESSAGE_CHECKED,
            id:id,
            checked:checked
        })
    }
}

export const MESSAGE_READ = 'Message_READ'
export const markMessageRead = () => {

    return async (dispatch, getState) =>{

        const messageIDs = []
        const messageItems = getState().messages.messages
        //console.log("MessageStore", messageIt)
        messageItems.map(messageItem => {if (messageItem.selected === true) {messageItem.read=true; messageIDs.push(messageItem.id)}})

        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/messages`, {
            method: 'PATCH',
            body: JSON.stringify({
                messageIds: messageIDs,
                command: "read",
                read: true
            }),
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })

        dispatch({
            type: MESSAGE_READ,
            ids:messageIDs
        })
    }

}

export const MESSAGE_UNREAD = 'Message_UNREAD'
export const markMessageUnRead = () => {

    return async (dispatch, getState) =>{

        const messageIDs = []
        const messageItems = getState().messages.messages
    //    console.log("MessageStore", messageItems)
        messageItems.map(messageItem => {if (messageItem.selected === true) {messageItem.read=false; messageIDs.push(messageItem.id)}})

        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/messages`, {
            method: 'PATCH',
            body: JSON.stringify({
                messageIds: messageIDs,
                command: "read",
                read: false
            }),
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })

        dispatch({
            type: MESSAGE_UNREAD,
            ids:messageIDs
        })
    }
}

export const MESSAGE_DELETED = 'Message_DELETED'
export const deleteMessage = () => {

    return async (dispatch, getState) =>{

        const messageIDs = []
        const messageItems = getState().messages.messages
        messageItems.map(messageItem => {if (messageItem.selected === true) messageIDs.push(messageItem.id)})

        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/messages`, {
            method: 'PATCH',
            body: JSON.stringify({
                messageIds: messageIDs,
                command: "delete"
            }),
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })

        dispatch({
            type: MESSAGE_DELETED,
            ids:messageIDs
        })
    }
}

export const MESSAGE_LABELED = 'Message_LABELED'
export const labelMessage = (selectedLabel) => {

    return async (dispatch, getState) =>{

        const messageIDs = []
        const messageItems = getState().messages.messages
        messageItems.map(messageItem => {
            if (messageItem.selected === true){
                if (messageItem.labels.findIndex(e => (e === selectedLabel)) === -1){
                    messageIDs.push(messageItem.id)
                }
            }
        })

     //   console.log("state2", messageItems)
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/messages`, {
            method: 'PATCH',
            body: JSON.stringify({
                messageIds: messageIDs,
                command: "addLabel",
                label:selectedLabel
            }),
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })

        dispatch({
            type: MESSAGE_LABELED,
            label:selectedLabel
        })
    }
}

export const MESSAGE_UNLABELED = 'Message_UNLABELED'
export const unlabelMessage = (selectedLabel) => {

    return async (dispatch, getState) =>{

        const messageIDs = []
        const messageItems = getState().messages.messages
        messageItems.map(messageItem => {
            if (messageItem.selected === true){
                let labelIndex = messageItem.labels.findIndex(e => (e === selectedLabel))
                if (labelIndex !== -1){
                    messageIDs.push(messageItem.id)
                }
            }
        })
       // console.log("state1", messageItems)

        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/messages`, {
            method: 'PATCH',
            body: JSON.stringify({
                messageIds: messageIDs,
                command: "removeLabel",
                label:selectedLabel
            }),
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })

        dispatch({
            type: MESSAGE_UNLABELED,
            label:selectedLabel
        })
    }
}

export const MESSAGE_CHECKUNCHECK_ALL = 'MESSAGE_CheckUncheckAll'
export const checkUncheckAllMessages = () => {

    return async (dispatch) => {
        dispatch({
            type:MESSAGE_CHECKUNCHECK_ALL
        })
    }
}

export const MESSAGE_CREATE_FORM_OPEN_CLOSE = 'MESSAGE_CreateFormOpenClose'
export const messageCreateFormOpenClose = () => {

    return async (dispatch) => {
        dispatch({
            type:MESSAGE_CREATE_FORM_OPEN_CLOSE
        })
    }
}

