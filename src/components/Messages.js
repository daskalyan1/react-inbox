import React from 'react'
import Message from "./Message";

const Messages = ({messages, itemChecked, itemStarred}) => {

    return (
        <div className="collection">
            {messages.map(message => <Message key={message.id} messageItem={message} onChange={itemChecked} onStarred={itemStarred}/>)}
        </div>)
}
export default Messages