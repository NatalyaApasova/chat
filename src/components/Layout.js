import React from 'react';
import './styles/layout.css';
import ChatForm from './ChatForm.js';
import Login from './Login.js';

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: ''
    }
    this.getLogin = this.getLogin.bind(this);
  }

  getLogin(login){
    console.log(login)
    this.setState({login: login});
  }

  render() {
    return (
      <>
        <header className="app-header">
          <span>Chat</span>
          <span>{this.state.login || localStorage.getItem('login') || "Guest"}</span>          
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

export {Layout};
