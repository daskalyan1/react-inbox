import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {sendMessage} from "../actions";

const AddMessageForm = ({messageAdded, showComposeForm}) => {

    if (showComposeForm){
        return(
            <form className="form-horizontal well" onSubmit={e => {

                const data = {
                    id:0,
                    subject: e.target.subject.value,
                    body: e.target.body.value,
                    read: false,
                    starred: false,
                    selected:false,
                    labels: []
                }
                messageAdded(data)
                e.preventDefault()

            }}>
                <div className="form-group">
                    <div className="col-sm-8 col-sm-offset-2">
                        <h4>Compose Message</h4>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">Subject</label>
                    <div className="col-sm-8">
                        <input type="text" className="form-control" id="subject" placeholder="Enter a subject" name="subject"/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">Body</label>
                    <div className="col-sm-8">
                        <textarea name="body" id="body" className="form-control"/>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-8 col-sm-offset-2">
                        <input type="submit" value="Send" className="btn btn-primary"/>
                    </div>
                </div>
            </form>)}
            else
                return ""
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => bindActionCreators({
    messageAdded:sendMessage
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
) (AddMessageForm)