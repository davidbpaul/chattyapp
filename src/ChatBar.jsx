import React, {Component} from 'react';
import Message from './Message.jsx';

class ChatBar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      content: "",
      username: props.username || "Anonymous"
    }
  }
  changeUsername = (e) => {
    let user = e.target.value

    this.setState({ username: user })
  }
  changeMessage = (e) => {
    this.setState({ content: e.target.value })
    this.props.onTyping(this.state)
  }

  onEnter = (e) => {
    if (e.key === "Enter") {
      this.props.handleMsg(this.state)
      this.setState({ content: "" })
    }
  }
  onBlur = (e) => {
    let user = e.target.value
    let oldUser = this.state.current_username
    if(oldUser === undefined){
      oldUser = "Anonymous"
    }
    //on blur if username Changes chat is notified
    if(this.state.current_username !== user){
      console.log("old user ", this.state.current_username)
      console.log("new user ", user)
      this.state.current_username = user
      console.log("check ", this.state)
      this.props.handleNotifications(this.state, user, oldUser)
    }
    //on blur if username is blank username becomes  "Anonymous"
    if (user.trim() === "" || user.trim() === null ){
      user = "Anonymous"
    }
      this.setState({ username: user })
  }

  render() {
      return (
        <footer>

          <input
            id="username"
            type="text"
            placeholder="Your Name (Optional)"
            value={ this.state.username }
            onChange={ this.changeUsername }
            onBlur={this.onBlur}
          />

          <input
            id ="new-message"
            type="text"
            placeholder="Type a message and hit ENTER"
            onChange={ this.changeMessage }
            value={ this.state.content }
            onKeyPress={ this.onEnter }
          />
        </footer>
          )
      }
    }
export default ChatBar;
