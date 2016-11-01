 import React, {Component} from 'react';
 import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    return (
      <div id="message-list">
        {this.props.messages.map(function(message){

          return (
            <Message i={message} key = {message.id} />
          )
        })}
      </div>
    );
  }
}
export default MessageList;
