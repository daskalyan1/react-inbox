import React from 'react'

const Message = ({messageItem, onChange, onStarred}) => {

    const handleOnChange = (e) => {onChange(e.target.name, e.target.checked)}
    const handleOnStarred = (id, starred) => {onStarred(id, starred)}
    const handleMessageClass = (e) => {
                                        let classDesc
                                        if (e.read)
                                            classDesc = 'row message read'
                                        else
                                            classDesc = 'row message unread'
                                        if (e.selected)
                                            classDesc = classDesc + ' row message selected'
                                        return classDesc
                                        }
    return(
        <div className={handleMessageClass(messageItem)}>
            <div className="col-xs-1">
                <div className="row">
                    <div className="col-xs-2">
                        <input type="checkbox" defaultChecked={messageItem.selected} onChange={handleOnChange} name={messageItem.id} checked={messageItem.selected?true:false}/>
                    </div>
                    <div className="col-xs-2" >
                        <i onClick={() => handleOnStarred(messageItem.id, messageItem.starred)} className={messageItem.starred ? 'star fa fa-star' : 'star fa fa-star-o'}></i>
                    </div>
                </div>
            </div>
            <div className="col-xs-11">
                {messageItem.labels.map((label) => <span class="label label-warning">{label}</span>)}
                <a href="#">{messageItem.subject}</a>
            </div>
        </div>)
}

export default Message