import React from 'react';
import './styles/layout.css';
import { DateTime } from 'luxon';

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
    this.wsClose = this.wsClose.bind(this);
  }

  wsConnection() {
    let wsUri = 'ws://st-chat.shas.tel';
    let ws = new WebSocket(wsUri);
    ws.onmessage = this.wsMessage;
    ws.onclose = this.wsClose;
    this.setState({ws: ws});
    // this.state.ws.onmessage = this.wsMessage;
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
        date: chatMessage[0].time
      }
    console.log(msg)
    this.setState({messages: [...this.state.messages, msg]});
    }
    // this.setState({messages: [{from: 'Test', message: 'Test', data: ''}]})
    // let a = this.state.messages;
    // a.push(msg)
    // console.log([a, JSON.stringify(msg)]);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    const message = {
      from: "Natta",
      message: this.state.value,
      // "time": DateTime.local()
    }

    this.state.ws.send(JSON.stringify(message));
    // this.state.ws.send("");
  }

  wsOpen(e) {
    console.log('Connect...')
  }

  componentDidMount() {
    this.wsConnection();
    this.wsOpen();

    // const doSend = function(message) {
  // if (this.state.ws) this.state.ws.onclose = function(e) { this.wsClose(e) };
}

  render() {
    return (
      <>
        <div className="user-list">
          {this.state.messages.map((message) => {return <p>{message.from}</p>})}
        </div>
        <div className="message-form">
          <div className="messages">
            <div className="message">
              {this.state.messages.map((message) => {
                return (
                  <>
                    <p>From: {message.from}</p>
                    <p>{message.message}</p>
                    <p>Date: {message.date}</p>
                 </>
                )
              })}
            </div>
          </div>
          <label>
            <textarea type="text" className="message-input" value={this.state.value} onChange={this.handleChange} />
            <input  type="submit" value="Submit" onClick={this.handleSubmit}/>
          </label>
        </div>
      </>
    );
  }
}
