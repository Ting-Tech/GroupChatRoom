const tls = require('tls');
const fs = require('fs');
const { encodeMessage, decodeMessage } = require('./protocol');
const { saveMessage } = require('./database');

const clients = new Map();

// 加載憑證
const options = {
    key: fs.readFileSync('server-key.pem'),
    cert: fs.readFileSync('server-cert.pem'),
};

const server = tls.createServer(options, (socket) => {
    console.log('Client connected');
    
    // 接收訊息
    socket.on('data', (data) => {
        const message = decodeMessage(data);
        if (message) {
            console.log('Received:', message);

            // 儲存訊息到資料庫
            saveMessage(message.type, message.from, message.to, message.content);

            // 廣播訊息
            if (message.type === 'broadcast') {
                clients.forEach((client) => {
                    if (client !== socket) client.write(data);
                });
            }
        }
    });

    // 處理斷線
    socket.on('end', () => {
        console.log('Client disconnected');
        clients.delete(socket);
    });

    clients.set(socket, socket);
});

server.listen(8000, () => {
    console.log('Secure Chat Server running on port 8000');
});
