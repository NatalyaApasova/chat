import React from 'react';
import './styles/layout.css';
import { DateTime } from 'luxon';

class ChatForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      message: 'some message',
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
    this.setState({message: chatMessage[0].message});
    this.setState({messages: [...this.state.messages, this.state.message]})
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    console.log('WS')
    console.log(this.state.ws);
    const message = {
      "from": "Natta",
      "message": this.state.value,
      // "time": DateTime.local()
    }

    this.state.ws.send(JSON.stringify(message));
    // this.state.ws.send("");
  }

  wsOpen(e) {
    this.handleSubmit(JSON.stringify({ "name":"Natta", "text": "Who am I? Where am I?" }));
  }

  componentDidMount() {
    this.wsConnection();
    // this.wsOpen();

    // const doSend = function(message) {
  // if (this.state.ws) this.state.ws.onclose = function(e) { this.wsClose(e) };
}

  render() {
    // return (
    //   <form className="message-form" onSubmit={this.handleSubmit}>
    //     <label>
    //       <textarea className="message-input" value={this.state.value} onChange={this.handleChange} />
    //     </label>
    //     <div>
    //       <input type="submit" value="Submit" />
    //     </div>
    //   </form>
    // );
    return (
      <div className="message-form">
        <div className="messages">
          {this.state.messages}
        </div>
        <label>
          <input type="text" className="message-input" value={this.state.value} onChange={this.handleChange} />
          <input type="submit" value="Submit" onClick={this.handleSubmit}/>
        </label>
      </div>
    );

  }
}

export default ChatForm;
