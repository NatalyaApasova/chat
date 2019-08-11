import React from 'react';
import './styles/layout.css';
import { DateTime } from 'luxon';
import { Message } from './Message.js';

const dt = DateTime.local();

export default class ChatForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      messages: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.wsMessage = this.wsMessage.bind(this);
    this.wsClose = this.wsClose.bind(this);
  }

  wsConnection() {
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

    if(chatMessage[0] !== undefined) {
      const msg = {
        from: chatMessage[0].from,
        message: chatMessage[0].message,
        date: dt
      }
    console.log(msg)
    this.setState({messages: [...this.state.messages, msg]});
    }
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
    // this.setState({input.value: ''})
    // this.state.ws.send("");
  }

  wsOpen(e) {
    console.log('Connect...')
  }

  wsError() {

  }

  componentDidMount() {
    this.wsConnection();
    this.wsOpen();
  }

  render() {
    return (
      <>
        <div className="message-form">
          <div className="messages">
            <div className="message">
              {this.state.messages.map((message) => {
                return (
                  <Message message={message} />
                )
              })}
            </div>
          </div>
          <label>
            <textarea className="message-input" type="text" value={this.state.value} onChange={this.handleChange} />
            <input className="message-input-submit" type="submit" value="Submit" onClick={this.handleSubmit} />
          </label>
        </div>
      </>
    );
  }
}
