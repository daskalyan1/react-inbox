import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {starUnStarMessage, checkUnCheckMessage} from '../actions'

const Message = ({messageItem, onChange, onStarred}) => {

    console.log('rendered', messageItem)

    const handleOnChange = (e) => {
        onChange(e.target.name, e.target.checked)
    }
    const handleOnStarred = (id, starred) => {
        onStarred(id, starred)
    }
    const handleMessageClass = (e) => {
        let classDesc
        if (e && e.read)
            classDesc = 'row message read'
        else
            classDesc = 'row message unread'
        if (e && e.selected)
            classDesc = classDesc + ' row message selected'
        return classDesc
    }
    if(messageItem) {
        return (
            <div className={handleMessageClass(messageItem)}>
                <div className="col-xs-1">
                    <div className="row">
                        <div className="col-xs-2">
                            <input type="checkbox" defaultChecked={messageItem.selected} onChange={handleOnChange}
                                   name={messageItem.id} checked={messageItem.selected ? true : false}/>
                        </div>
                        <div className="col-xs-2">
                            <i onClick={() => handleOnStarred(messageItem.id, messageItem.starred)}
                               className={messageItem.starred ? 'star fa fa-star' : 'star fa fa-star-o'}></i>
                        </div>
                    </div>
                </div>
                <div className="col-xs-11">
                    {messageItem.labels.map((label) => <span class="label label-warning">{label}</span>)}
                    <a href="#">{messageItem.subject}</a>
                </div>
            </div>)
    }
    else {
        return null
    }
}

//shouldComponentUpdate(nextProps, nextState){
//return nextProps.data != messageItem
//}

const mapStateToProps = (state, ownProps) => {
   // // console.log('state', state)
   // // console.log('props', ownProps)
   //  console.log('message item',  state.messages.messages.find(message => message.id === ownProps.id))
   return {
        messageItem: state.messages.messages.find(message => message.id === ownProps.id)
   }
    //console.log("StateMsg", msg)
    //return {msg}
    //id: state.messages[ownProps.id].id
}

const mapDispatchToProps = dispatch => bindActionCreators({
    onChange: checkUnCheckMessage,
    onStarred: starUnStarMessage
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Message)