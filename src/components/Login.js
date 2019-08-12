import React from 'react';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: localStorage.getItem('login') || "Guest",
      value: localStorage.getItem('login') || "Guest"
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    this.setState({name: event.target.value});
    console.log(this.state.value)
  }

  handleSubmit() {
    this.props.getLogin(this.state.name);
    localStorage.setItem('login', `${this.state.name}`)
  }

  render() {
    return (
      <>
        <div><input type="text" value={this.state.value} onChange={this.handleChange} /></div>
        <div><input type="submit" value="Change name" onClick={this.handleSubmit} /></div>
      </>
    )
  }
}
