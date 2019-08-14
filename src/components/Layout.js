import React from 'react';
import './styles/layout.css';
import ChatForm from './ChatForm.js';
import Login from './Login.js';
import NetworkStatus from './NetworkStatus.js';

export default class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      online: true
    }
    this.getLogin = this.getLogin.bind(this);
    this.getNetworkStatus = this.getNetworkStatus.bind(this);
  }

  getLogin(login){
    this.setState({login: login}) || localStorage.getItem('login');
  }

  getNetworkStatus(online) {
    if (!navigator.onLine) {
      this.setState({online: true})
    }
    this.setState({online: false})
  }

  render() {
    return (
      <>
        <header className="app-header">
          <div className="logo"><h1>Chat</h1></div>
          <span>You are awesome, {this.state.login || localStorage.getItem('login') || "Guest"}! Have a nice talk! :)</span>          
          <NetworkStatus status={this.state.online}/>
          <div><Login getLogin={this.getLogin} /></div>
        </header>
        <main className="app-body">
          <div className="chat-form-container">
            <ChatForm login={this.state.login} />
          </div>
        </main>
        <footer className="app-footer">
        </footer>
      </>
    );
  }
}
