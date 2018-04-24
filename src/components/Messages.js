import React from 'react'
import Message from "./Message";
import { connect } from 'react-redux'

const Messages = ({messages}) => {
    if (messages){
        return (
            <div className="collection">
                {messages.map(message => <Message key={message.id} id={message.id}/>)}
            </div>)
    }
    else {
        return null
    }
}

const mapStateToProps = (state)  => {
    return {messages: state.messages.messages}
}
export default connect(
    mapStateToProps,
    null
)(Messages)