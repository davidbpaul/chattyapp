// server.js
const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('node-uuid')

// Set the port to 4000
const PORT = 5000;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server


const wss = new SocketServer({ server });
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
      client.send(data);
  });
};

var userCount = 0;

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  userCount += 1;
  wss.broadcast(JSON.stringify({ type: 'userCount', content: userCount }));
  console.log('Client connected');
  console.log(userCount)
  //user messages
  ws.on('message', (message) => {
    //recieving message
    let newMessage = JSON.parse(message);
    //unique id for message
    console.log(newMessage)
    newMessage.uuid = uuid.v1();
    switch (newMessage.type) {
      case 'postMessage':
        newMessage.type = 'incomingMessage';
        console.log("message ", newMessage)
        break;
      case 'postNotification':
        newMessage.type = 'incomingNotification';
        break;
      default:
       console.log('Unknown message type: ' + newMessage.type);
       break;
    }
    //transfers new msg
    wss.broadcast(JSON.stringify(newMessage));
  })
  ws.on('close', () => {
    userCount--;
    wss.broadcast(JSON.stringify({ type: 'userCount', content: userCount }));
  });
});

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
