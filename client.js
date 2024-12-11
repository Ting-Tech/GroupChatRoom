const tls = require('tls');
const readline = require('readline');

// 配置連線選項
const options = {
  host: 'localhost',
  port: 8000,
  rejectUnauthorized: false,
};

// 連接到服務器
const client = tls.connect(options, () => {
  console.log('Connected to server.');
  rl.question('Enter your username: ', (answer) => {
    client.write(answer);
  });
});

// 處理輸入和輸出
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

client.on('data', (data) => {
  console.log(data.toString().trim());
});

client.on('end', () => {
  console.log('Disconnected from server.');
});

client.on('error', (err) => {
  console.error('Connection error:', err.message);
});

// 傳送訊息
rl.on('line', (line) => {
  client.write(line);
});
