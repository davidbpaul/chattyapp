import React, {Component} from 'react';

class Message extends Component {
  render() {
    return (
      <div className="message">
        <span className="username"><b> {this.props.i.username} </b></span>
        <span className="content"> {this.props.i.content}  </span>
      </div>
    );
  }
}
export default Message;
