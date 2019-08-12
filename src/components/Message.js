import React from 'react';
import './styles/layout.css';

class Message extends React.Component {
  render() {
    return (
       <>
        <div className="message">
          <p>From: {this.props.message.from} ({this.props.message.date})</p>
          <p>{this.props.message.message}</p>
        </div>
       </>
    )
  }
}

export {Message};