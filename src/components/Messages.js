import React from 'react'
import Message from "./Message";
import { connect } from 'react-redux'

const Messages = ({messages}) => {
    console.log('Messages3', messages)
    return (
        <div className="collection">
            {messages.map(message => <Message key={message.id} messageItem={message} id={message.id}/>)}
        </div>)
}

const mapStateToProps = (state)  => {
    messages: state.messages.messages
}
export default connect(
    mapStateToProps,
    null
)(Messages)