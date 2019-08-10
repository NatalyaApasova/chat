import React from 'react';
import './styles/layout.css';
import ChatForm from './ChatForm.js';

class Layout extends React.Component {
  render() {
    return (
      <>
        <header className="app-header">
          <p>Chat</p>
          <div className="login-button"><div>Log in</div></div>
        </header>
        <main className="app-body">
            <ChatForm />
        </main>
        <footer className="app-footer">
        </footer>
      </>
    );
  }
}

export {Layout};
