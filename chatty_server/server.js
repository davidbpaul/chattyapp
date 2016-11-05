// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('node-uuid');

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

// function getRandomIntInclusive(min, max) {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
var userCount = 0;
// var colors = ['#4ECDC4', '#C7F464', '#FF6B6B', '#556270'];

wss.on('connection', (ws) => {
  userCount++;
  wss.broadcast(JSON.stringify({ type: 'userCount', content: userCount }));

  // colorMsg = {
  //   type: 'userColor',
  //   color: colors[getRandomIntInclusive(0, colors.length - 1)]
  // }
  // ws.send(JSON.stringify(colorMsg));

  ws.on('message', (message) => {
    var nMessage = JSON.parse(message);
    nMessage.uuid = uuid.v1();
    switch (nMessage.type) {
      case 'postMessage':
        nMessage.type = 'incomingMessage';
        break;
      case 'postNotification':
        nMessage.type = 'incomingNotification';
        break;
      default:
        console.log('Unknown message type: ' + nMessage.type);
        break;
    }
    wss.broadcast(JSON.stringify(nMessage));
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    userCount--;
    wss.broadcast(JSON.stringify({ type: 'userCount', content: userCount }));
  });
});
