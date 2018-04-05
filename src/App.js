import React, { Component } from 'react';
import './App.css';
import AddMessageForm from "./components/AddMessageForm";
import Messages from "./components/Messages";
import Toolbar from "./components/Toolbar";

class MessageApp extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            composeFormOpenState:false,
            messages: [],
        }
    }

    async addMessage(message){
        //message.id = this.state.messages.reduce((accumulator, currentValue) => Math.max(accumulator, currentValue.id), 0) + 1
        //console.log('id', this.state.messages.reduce((accumulator, currentValue) => Math.max(accumulator, currentValue.id), 0))
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/messages`, {
            method: 'POST',
            body: JSON.stringify({
                                subject: message.subject,
                                body: message.body
                                }),
            headers:{
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                    }
            })
        const newMessage = await response.json()
        message.id = newMessage.id

        this.setState({
            messages: this.state.messages.concat(message),
            composeFormOpenState:false
        })
    }

    itemChecked = (id, checked) => {
        const messageItems = this.state.messages
        messageItems[messageItems.findIndex(e => (e.id.toString() ===id.toString()))].selected=checked
        this.setState({
            messages:messageItems
        })
    }

    async itemStarred(id, starred){

        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/messages`, {
            method: 'PATCH',
            body: JSON.stringify({
                            messageIds: [id],
                            command: "star",
                            star: starred?false:true
            }),
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })

        const messageItems = this.state.messages
        starred ? messageItems[messageItems.findIndex(e => (e.id.toString() ===id.toString()))].starred=false : messageItems[messageItems.findIndex(e => (e.id.toString() ===id.toString()))].starred=true
        this.setState({
            messages:messageItems
        })
    }

    async itemRead(){
        const messageIDs = []
        const messageItems = this.state.messages
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
        this.setState({
            messages:messageItems
        })
    }

    async itemUnread(){
        const messageIDs = []
        const messageItems = this.state.messages
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
        this.setState({
            messages:messageItems
        })
    }

    async itemDeleted(){
        const messageIDs = []
        const messageItems = this.state.messages
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
        this.setState({
            messages:messageItems.filter(messageItem => messageItem.selected === false)
        })
    }

    async itemLabeled(selectedLabel){
        const messageIDs = []
        const messageItems = this.state.messages
        messageItems.map(messageItem => {
                                if (messageItem.selected === true){
                                    if (messageItem.labels.findIndex(e => (e === selectedLabel)) === -1){
                                        messageItem.labels = messageItem.labels.concat(selectedLabel)
                                        messageIDs.push(messageItem.id)
                                    }
                                }
        })

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

        this.setState({
            messages:messageItems
        })
    }

    async itemUnlabeled(selectedLabel){
        const messageIDs = []
        const messageItems = this.state.messages
        messageItems.map(messageItem => {
            if (messageItem.selected === true){
                let labelIndex = messageItem.labels.findIndex(e => (e === selectedLabel))
                if (labelIndex !== -1){
                    messageItem.labels.splice(labelIndex, 1)
                    messageIDs.push(messageItem.id)
                }
            }
        })

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
        this.setState({
            messages:messageItems
        })
    }

    checkUncheckAll = () => {
        const messageItems = this.state.messages
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
        this.setState({
            messages:messageItems
        })
    }

    composeFormOpenClose = () => {
        if (this.state.composeFormOpenState) {this.setState({composeFormOpenState: false})} else this.setState({composeFormOpenState: true})
    }

    async componentDidMount(){
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/messages`)
        const json = await response.json()
        this.setState({
            messages:json._embedded.messages.map(message => {message.selected = false; return message})
        })
        //console.log("message1:", json._embedded.messages.map(message => {message.selected = false; return message}))
    }

    render() {
        console.log('Messages2', this.state.messages)
        return (
        <div>
            <AddMessageForm messageAdded={this.addMessage.bind(this)} showComposeForm={this.state.composeFormOpenState}/>
            <div className="container">
                <Toolbar messages={this.state.messages} itemRead={this.itemRead.bind(this)} itemUnread={this.itemUnread.bind(this)} itemDeleted={this.itemDeleted.bind(this)} itemLabeled={this.itemLabeled.bind(this)} itemUnlabeled={this.itemUnlabeled.bind(this)} checkUncheckAll={this.checkUncheckAll} composeFormOpenClose={this.composeFormOpenClose}/>
                <Messages messages={this.state.messages} itemChecked={this.itemChecked} itemStarred={this.itemStarred.bind(this)}/>
            </div>
        </div>
        )
    }
}

export default MessageApp;
