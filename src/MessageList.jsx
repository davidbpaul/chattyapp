import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {

 renderMessages(messages) {
   return messages.map((message) => <Message i={ message } key={ message.id } />)
 }
 render() {
   return (
     <div id="message-list">
       { this.renderMessages(this.props.messages) }
     </div>
   );
 }
}
 //console.log('message');
export default MessageList;
