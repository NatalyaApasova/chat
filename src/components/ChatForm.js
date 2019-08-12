import React from 'react';
import './styles/layout.css';
import { DateTime } from 'luxon';
import { Message } from './Message.js';

export default class ChatForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      messages: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.wsMessage = this.wsMessage.bind(this);
    this.wsOpen = this.wsOpen.bind(this);
    this.wsClose = this.wsClose.bind(this);
  }

  wsConnection(e) {
    let wsUri = 'ws://st-chat.shas.tel';
    let ws = new WebSocket(wsUri);
    ws.onmessage = this.wsMessage;
    ws.onclose = this.wsClose;
    this.setState({ws: ws});   
  }

  wsClose() {
    this.wsConnection();
    console.log('Closing connection...');
  }

  wsMessage(e) {
    const chatMessage = JSON.parse(e.data);
    console.log(chatMessage)
    let date = DateTime.local().toLocaleString(DateTime.DATETIME_FULL);
    if((chatMessage[0] !== undefined) && (this.props.login !== "Guest".toLowerCase())) {
    const msg = {
      from: chatMessage[0].from,
      message: chatMessage[0].message,
      date: date
    }
      this.setState({messages: [...this.state.messages, msg]});
    }
    if(this.wsConnection) {
      chatMessage.map((msg) => {
        msg = {
          from: msg.from,
          message: msg.message,
          date: date
        }
          // date: DateTime.fromMillis(msg.time).toFormat(DateTime.DATETIME_MED_WITH_SECONDS)
    this.setState({messages: [...this.state.messages, msg]});
    })
    }
    
    // if(!this.nameInput.focus() && Notification.premission === "granted") {
    //   Notification(msg);
    // }
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    const message = {
      from: this.props.login,
      message: this.state.value
    }
    this.state.ws.send(JSON.stringify(message));
  }

  wsOpen(e) {
    console.log('Connect...')

  }

  wsError() {

  }

  componentDidMount() {
    this.wsConnection();
    this.nameInput.focus(); 
    this.wsOpen();
  }

  render() {
    return (
      <>
        <div className="message-form">
          <div className="messages">
              {this.state.messages.map((message) => {
                return (
                  <Message message={message} />
                )
              })}
          </div>
          <label>
            <textarea className="message-input" type="text" value={this.state.value} ref={(input) => { this.nameInput = input; }} 
 onChange={this.handleChange} />
            <input className="message-input-submit" type="submit" value="Submit" onClick={this.handleSubmit} />
          </label>
        </div>
      </>
    );
  }
}
