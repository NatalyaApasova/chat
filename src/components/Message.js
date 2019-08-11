import React from 'react';
import './styles/layout.css';

class Message extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
       <>
          <p>From: {this.props.message.from}</p>
          <p>{this.props.message.message}</p>
          <p>Date: {this.props.message.date}</p>
       </>
    )
  }
}

export {Message};