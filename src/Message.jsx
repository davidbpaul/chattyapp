import React, {Component} from 'react';

class Message extends Component {
  render() {
    if (this.props.i.type === 'message system') {
      return (
        <div className={this.props.i.type}>
          {this.props.i.messages}
        </div>
      )
    } else {
        return (
          <div className="message">
            <span className="username" style={{color: this.props.i.color}}><b>{ this.props.i.name  }</b></span>
            <span className="content">{ this.props.i.messages }</span>
          </div>
       );
     }
  }
}
export default Message;
