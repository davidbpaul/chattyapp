import React, {Component} from 'react';
import Message from './Message.jsx';


class ChatBar extends Component {
  render() {
    return (
      <footer>
        <input
          id="username"
          type="text"
          placeholder="Your Name (Optional)"
          onKeyUp={this.props.handleUser}
        />
        <input
          id="new-message"
          type="text"
          placeholder="Type a message and hit ENTER"
          onKeyUp={this.props.handleMsg}
        />
      </footer>
    );
  }
};
export default ChatBar;
