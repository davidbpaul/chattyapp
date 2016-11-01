import React, {Component} from 'react';

class ChatBar extends Component {
  // getInitialState: () =>{
  //   return value: ""};
  // },
  function handleMsg(e){
      // e.key === 'Enter')
        console.log( e.target.value)

        // this.setState({msg: e.target.value});
        // var msg = {
        //   content: typedMsg
        // };
    },
  render() {
      return (
        <footer>
          <input
            type="text"
            placeholder="Your Name (Optional)"
          />
          <input
            type="text"
            placeholder="Type a message and hit ENTER"
            onKeyDown={this.handleMsg}
          />
        </footer>
          )
      }
    }
export default ChatBar;
