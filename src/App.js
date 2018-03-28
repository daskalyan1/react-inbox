import React, { Component } from 'react';
import './App.css';
import AddMessageForm from "./AddMessageForm";
import Messages from "./Messages";


const initialMessageData =
[
    {
        id: 1,
        subject: "You can't input the protocol without calculating the mobile RSS protocol!",
        body:"",
        read: false,
        starred: true,
        selected:false,
        labels: ["dev", "personal"]
    },
    {
        id: 2,
        subject: "connecting the system won't do anything, we need to input the mobile AI panel!",
        body:"",
        read: false,
        starred: false,
        selected:true,
        labels: []
    },
    {
        id: 3,
        subject: "Use the 1080p HTTP feed, then you can parse the cross-platform hard drive!",
        body:"",
        read: false,
        starred: true,
        selected:false,
        labels: ["dev"]
    },
    {
        id: 4,
        subject: "We need to program the primary TCP hard drive!",
        body:"",
        read: true,
        starred: false,
        selected:true,
        labels: []
    },
    {
        id: 5,
        subject: "If we override the interface, we can get to the HTTP feed through the virtual EXE interface!",
        body:"",
        read: false,
        starred: false,
        selected:false,
        labels: ["personal"]
    },
    {
        id: 6,
        subject: "We need to back up the wireless GB driver!",
        body:"",
        read: true,
        starred: true,
        selected:false,
        labels: []
    },
    {
        id: 7,
        subject: "We need to index the mobile PCI bus!",
        read: true,
        starred: false,
        selected:false,
        labels: ["dev", "personal"]
    },
    {
        id: 8,
        subject: "If we connect the sensor, we can get to the HDD port through the redundant IB firewall!",
        read: true,
        starred: true,
        selected:false,
        labels: []
    }
]

class MessageApp extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            messages: initialMessageData,
        }
    }

    addMessage = (message) => {
        message.id = this.state.messages.reduce((accumulator, currentValue) => Math.max(accumulator, currentValue.id), 0) + 1
        //console.log('id', this.state.messages.reduce((accumulator, currentValue) => Math.max(accumulator, currentValue.id), 0))
        this.setState({
            messages: this.state.messages.concat(message)
        })
        console.log('messages:', this.state.messages)
    }

    itemChecked = (id, checked) => {
        const messageItems = this.state.messages
        messageItems[messageItems.findIndex(e => (e.id.toString() ===id.toString()))].selected=checked
        this.setState({
            messages:messageItems
        })
    }

    itemStarred = (id, starred) => {
        const messageItems = this.state.messages
        starred ? messageItems[messageItems.findIndex(e => (e.id.toString() ===id.toString()))].starred=false : messageItems[messageItems.findIndex(e => (e.id.toString() ===id.toString()))].starred=true
        this.setState({
            messages:messageItems
        })
    }

    itemRead = () => {
        const messageItems = this.state.messages
        messageItems.map(messageItem => {if (messageItem.selected === true) messageItem.read=true})
        this.setState({
            messages:messageItems
        })
    }

    itemUnread = () => {
        const messageItems = this.state.messages
        messageItems.map(messageItem => {if (messageItem.selected === true) messageItem.read=false})
        this.setState({
            messages:messageItems
        })
    }

    itemDeleted = () => {
        const messageItems = this.state.messages
        this.setState({
            messages:messageItems.filter(messageItem => messageItem.selected === false)
        })
    }

    itemLabeled = (selectedLabel) => {
        const messageItems = this.state.messages
        messageItems.map(messageItem => {
                                if (messageItem.selected === true){
                                    if (messageItem.labels.findIndex(e => (e === selectedLabel)) === -1){
                                        messageItem.labels = messageItem.labels.concat(selectedLabel)
                                    }
                                }
        })
        this.setState({
            messages:messageItems
        })
    }

    itemUnlabeled = (selectedLabel) => {
        const messageItems = this.state.messages
        messageItems.map(messageItem => {
            if (messageItem.selected === true){
                let labelIndex = messageItem.labels.findIndex(e => (e === selectedLabel))
                if (labelIndex !== -1){
                    messageItem.labels.splice(labelIndex, 1)
                }
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

    render() {
        console.log('Messages2', this.state.messages)
        return (
        <div>
            <AddMessageForm messageAdded={this.addMessage}/>
            <Messages messages={this.state.messages} itemChecked={this.itemChecked} itemStarred={this.itemStarred} itemRead={this.itemRead} itemUnread={this.itemUnread} itemDeleted={this.itemDeleted} itemLabeled={this.itemLabeled} itemUnlabeled={this.itemUnlabeled} checkUncheckAll={this.checkUncheckAll}/>
        </div>
        )
    }
}

export default MessageApp;
