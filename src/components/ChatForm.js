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
    let wsUri = 'wss://wssproxy.herokuapp.com/';
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
    if (this.wsConnection && (chatMessage[0] !== undefined) && (this.props.login !== "Guest".toLowerCase())) {
      const msg = {
        from: chatMessage[0].from,
        message: chatMessage[0].message,
        date: date
      }
      this.setState({messages: [...this.state.messages, msg]});
    }

    let hidden;
    let visibilityChange; 
    if (typeof document.webkitHidden !== "undefined") {
      hidden = "webkitHidden";
      visibilityChange = "webkitvisibilitychange";
    }

    if (Notification.permission === "granted" && document[hidden]) {
      chatMessage.map((msg) => {
        msg = {
          from: chatMessage[0].from,
          message: chatMessage[0].message,
          date: date
        }
      let title = msg.from;
      let body =  msg.message;
      const notification = new Notification(`From: ${title}: \"${body}\"`);
      })
    }
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    const message = {
      from: localStorage.getItem('login') || this.props.login,
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
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  render() {
    return (
      <>
        <div className="message-form">
          <div className="messages">
              {this.state.messages.map((message) => {
                return (
                  <Message key={message.id} message={message} />
                )
              })}
            <div style={{ float:"left", clear: "both" }}
               ref={(el) => { this.messagesEnd = el; }}>
            </div>
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
