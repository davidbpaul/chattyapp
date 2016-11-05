import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {
  //static counter = 2
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: ""},
      typingMessage: "",
      messages: [],
      userCount: 0,
      color: ''
    };
  }

  componentDidMount () {
    // console.log("componentDidMount <App />");
    this.socket = new WebSocket("ws://0.0.0.0:5000");
    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      switch (message.type) {
        case 'colorAssigned':
        console.log('color ', message.color)
          this.setState({color: message.color})
          break;
        case 'incomingMessage':
          this.setState({
            messages:   this.state.messages.concat(message)
          })
        break;
        case 'incomingNotification':
          message.type = 'message system';
          // this.setState({
          //  notification:   this.state.messages.concat(message)
          // })
          this.setState({
            messages:   this.state.messages.concat(message)
          })
          break;
        case 'userCount':
          this.setState({
            userCount:   this.state.messages.concat(message.content)
          })
          break;
        default:
          console.log('Unknown message type: ', message.type);
          break;
      }
    }
  }

  handleMsg = (e) => {
    // Guard statement!
    if (e.key === 'Enter') {
      let typedMsg  = e.target.value;
      if (this.state.currentUser.name.trim() === "" || this.state.currentUser.name.trim() === null ){
        this.state.currentUser.name = "Anonymous"
      }
      let msg = {
        type: 'postMessage',
        name: this.state.currentUser.name,
        messages: typedMsg,
        color: this.state.color
      }
      console.log("fried ",this.state.color)
      this.socket.send(JSON.stringify(msg));
      e.target.value = '';

    }
  }
  handleUser = (e) => {
    if (e.key === 'Enter') {
      console.log("old ", this.state.currentUser.name)

      let oldUser = this.state.currentUser.name || 'Anonymous';
      let newUser = e.target.value;
      //console.log(`newUser: ${newUser}`);
      // Update username before sending notification
      //console.log(this.state);
      this.setState({currentUser: {name: newUser}});
      //console.log(this.state);
      let msg = {
            type: 'postNotification',
            username: newUser,
            messages: `${oldUser } changed their name to ${newUser}`
        }
          this.socket.send(JSON.stringify(msg));

      }
    }

      render() {
        return (
          <div>
            <nav>
              <span className='userCount'>{this.state.userCount} users online</span>
              <h1>Chatty</h1>
            </nav>
            <MessageList
            messages={this.state.messages}
            color={this.state.color}
            />
            <ChatBar
              currentUser={this.state.currentUser}
              handleUser={this.handleUser}
              handleMsg={this.handleMsg}
            />
          </div>
        );
      }
    }
    export default App;
