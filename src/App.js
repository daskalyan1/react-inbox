import React from 'react';
import './App.css';
import AddMessageForm from "./components/AddMessageForm";
import Messages from "./components/Messages";
import Toolbar from "./components/Toolbar";
import store from './store';
import { connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import { getMessages} from './actions';

class MessageApp extends React.Component {

    componentDidMount() {
        store.dispatch(getMessages())
        //this.props.getMessages()
    }

    render() {
        return (
            (this.props.messages.length > 0) ? (
            <div>
                <AddMessageForm/>
                <div className="container">
                    <Toolbar/>
                    <Messages/>
                </div>
            </div>) : ''
        )
    }
}

const mapStateToProps = state => ({
    messages: state.messages.messages,
    composeFormOpenState: state.messages.composeFormOpenState
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getMessages
},dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
) (MessageApp)
