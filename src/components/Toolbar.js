import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators} from 'redux'
import {
    checkUncheckAllMessages, deleteMessage, labelMessage, markMessageRead, markMessageUnRead,
    unlabelMessage
} from "../actions";

const Toolbar = ({messages, itemRead, itemUnread, itemDeleted, itemLabeled, itemUnlabeled, checkUncheckAll, composeFormOpenClose}) => {

    const handleOnSelectLabel = (e) => {itemLabeled(e.target.value)}
    const handleOnUnselectLabel = (e) => {itemUnlabeled(e.target.value)}

    return(
        <div className="row toolbar">
            <div className="col-md}-12">
                <p className="pull-right">
                    <span className="badge badge">{messages.filter(message => message.read === false).length}</span>unread messages
                </p>

                <a class="btn btn-danger" onClick={composeFormOpenClose}>
                    <i class="fa fa-plus"></i>
                </a>

                <button className="btn btn-default" onClick={checkUncheckAll}>
                    <i className={(messages.filter(message => message.selected === true).length) === messages.length && messages.length >0 ? 'fa fa-check-square-o' : messages.filter(message => message.selected === true).length ===0 ? 'fa fa-square-o' : 'fa fa-minus-square-o'}></i>
                </button>

                <button className="btn btn-default" onClick={itemRead} disabled={messages.findIndex(e => (e.selected ===true)) === -1 ? "disabled": false}>
                    Mark As Read
                </button>

                <button className="btn btn-default" onClick={itemUnread} disabled={messages.findIndex(e => (e.selected ===true)) === -1 ? "disabled": false}>
                    Mark As Unread
                </button>

                <select name="ApplyLabel" value="" className="form-control label-select" onChange={handleOnSelectLabel} disabled={messages.findIndex(e => (e.selected ===true)) === -1 ? "disabled": false}>
                    <option value="">Apply label</option>
                    <option value="dev">dev</option>
                    <option value="personal">personal</option>
                    <option value="gschool">gschool</option>
                </select>

                <select className="form-control label-select" value="" onChange={handleOnUnselectLabel} disabled={messages.findIndex(e => (e.selected ===true)) === -1 ? "disabled": false}>
                    <option value="">Remove label</option>
                    <option value="dev">dev</option>
                    <option value="personal">personal</option>
                    <option value="gschool">gschool</option>
                </select>

                <button className="btn btn-default" onClick={itemDeleted} disabled={messages.findIndex(e => (e.selected ===true)) === -1 ? "disabled": false}>
                    <i className="fa fa-trash-o"></i>
                </button>
            </div>
        </div>)
}

const mapStateToProps = (state) => ({
    //messages: state.messages
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
    itemRead: markMessageRead,
    itemUnread: markMessageUnRead,
    itemDeleted:deleteMessage,
    itemLabeled:labelMessage,
    itemUnlabeled:unlabelMessage,
    checkUncheckAll:checkUncheckAllMessages
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
) (Toolbar)