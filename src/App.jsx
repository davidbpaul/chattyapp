import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import Message from './Message.jsx'

class App extends Component {
  static counter = 2
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: ""},
      typingMessage: "",
      messages: [],
      userCount: 0
    };
  }
  //get typed msg
  handleMsg = (message) => {
    //sending message
    console.log(message)
    this.setState({ messages: [...this.state.messages, this.addID(message)] })
    this.socket.send(JSON.stringify(message));
  }
  // get notification
  handleNotifications = (notification, user, oldUser) => {
    this.setState({ messages: [...this.state.messages, this.addNod(notification, user, oldUser)] })
    //sending message
    this.socket.send(JSON.stringify(notification));
  }
  addID(obj) {
    obj.id = (App.counter+= 1)
    obj.type = 'postMessage'
    return obj
  }
  addNod(obj, user, oldUser) {
    obj.type = 'postNotification'
    obj.username = ""
    obj.content = `${oldUser} has changed there name to ${user}`
    return obj
  }

componentDidMount (){
  console.log("componentDidMount <App />");
  //connecting to server
  this.socket = new WebSocket("ws://0.0.0.0:5000");
  //recieving message
  this.socket.onmessage = (ev) => {
    const message = JSON.parse(ev.data);

    switch (message.type) {
      case 'incomingMessage':
        //push message to messages (display on user screen)
        this.setState({
          messages: this.state.messages.concat(message),
        });
        break;
      case 'incomingNotification':
          message.type = 'message system';
          this.setState({
            notification: this.state.messages.concat(message),
          });
          break;
      case 'userCount':
        console.log(message)
        this.setState({
        userCount: this.state.messages.concat(message.content),
        })
         break;
      default:
        console.log('Unknown message type: ', message.type);
        break;
    }
  }
  // setTimeout(() => {
  //   console.log("Simulating incoming message");
  //   // Add a new message to the list of messages in the data store
  //   const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
  //   const messages = this.state.messages.concat(newMessage)
  //   console.log(messages)
  //   // Update the state of the app component.
  //   // Calling setState will trigger a call to render() in App and all child components.
  // //  this.setState({messages: messages})
  // }, 3000);
}

//under construction
showLivingTyping = ({ message, username }) => {
  this.setState({ typingMessage: message })
}


  render() {
    return (
      <div className="wrapper">
        <nav>
          <h1>Chatty</h1>
          <span className='userCount'>{this.state.userCount} users online</span>
        </nav>
        <MessageList
          messages={this.state.messages} />

        <ChatBar
          handleNotifications={this.handleNotifications}
          handleMsg={ this.handleMsg }
          onTyping={ this.showLivingTyping } />
      </div>
    );
  }
}
export default App;
