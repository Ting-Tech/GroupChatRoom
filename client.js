const tls = require('tls');
const readline = require('readline');
const { encodeMessage, decodeMessage } = require('./protocol');

// 連接伺服器
const client = tls.connect(8000, { rejectUnauthorized: false }, () => {
    console.log('Connected to server');
    sendLoginMessage();
});

// 讀取輸入
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.on('line', (line) => {
    const message = encodeMessage('broadcast', 'User', 'All', line);
    client.write(message);
});

// 接收伺服器訊息
client.on('data', (data) => {
    const message = decodeMessage(data);
    if (message) {
        console.log(`${message.from}: ${message.content}`);
    }
});

// 登入訊息
function sendLoginMessage() {
    const message = encodeMessage('login', 'User', 'Server', 'Hello!');
    client.write(message);
}
