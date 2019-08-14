import React from 'react';
import './styles/layout.css';

export default class NetworkStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      online: true
    };
    this.goOnline = this.goOnline.bind(this);
    this.goOffline = this.goOffline.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  goOnline() {
    this.setState({ online: true });
  }

  goOffline() {
    this.setState({ online: false });
  }

  componentDidMount() {
    this.setState({
       online: typeof navigator.onLine === "boolean" ? navigator.onLine : true
    });

    window.addEventListener("online", this.goOnline);
    window.addEventListener("offline", this.goOffline);
  }

  componentWillUnmount() {
    window.removeEventListener("online", this.goOnline);
    window.removeEventListener("offline", this.goOffline);
  }
   
  handleClick() {
    this.state.online ? this.goOffline() : this.goOnline();

    console.log(this.state.online)
  }

  render() {
    if (this.state.online) {
      return (
        <>
          <div className="offline" onClick={this.handleClick}></div>
        </>
      )
    } else {
      return (
        <>
          <div className="online" onClick={this.handleClick}></div>
        </>
      )
    }
  }
}
