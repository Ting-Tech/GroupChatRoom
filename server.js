const tls = require('tls');
const fs = require('fs');

// 存儲用戶名稱和 socket 的映射
const clients = new Map();

// 加載 TLS 憑證
const options = {
  key: fs.readFileSync('server-key.pem'),
  cert: fs.readFileSync('server-cert.pem'),
};

// 處理客戶端連線
const server = tls.createServer(options, (socket) => {
  let username = '';

  socket.write('Welcome! Please enter your username:\n');

  socket.on('data', (data) => {
    const message = data.toString().trim();

    // 如果用戶未設定名稱
    if (!username) {
      username = message;
      clients.set(username, socket);
      console.log(`${username} joined the chat.`);
      broadcast(`${username} joined the chat.`, username);
    } else {
      // 廣播訊息
      broadcast(`${username}: ${message}`, username);
    }
  });

  socket.on('end', () => {
    console.log(`${username} left the chat.`);
    clients.delete(username);
    broadcast(`${username} left the chat.`, username);
  });

  socket.on('error', (err) => {
    console.error('Socket error:', err.message);
  });
});

// 廣播訊息給所有客戶端
function broadcast(message, sender) {
  for (const [clientUsername, clientSocket] of clients.entries()) {
    if (clientUsername !== sender) {
      clientSocket.write(message + '\n');
    }
  }
}

server.listen(8000, () => {
  console.log('Secure Chat Server running on port 8000');
});
