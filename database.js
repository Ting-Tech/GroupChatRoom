const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./chat.db');

// 初始化資料庫
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            type TEXT,
            sender TEXT,
            receiver TEXT,
            content TEXT,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);
});

function saveMessage(type, sender, receiver, content) {
    db.run(
        'INSERT INTO messages (type, sender, receiver, content) VALUES (?, ?, ?, ?)',
        [type, sender, receiver, content],
        (err) => {
            if (err) console.error('Failed to save message:', err);
        }
    );
}

function getMessages(callback) {
    db.all('SELECT * FROM messages ORDER BY timestamp DESC', [], (err, rows) => {
        if (err) {
            console.error('Failed to fetch messages:', err);
            callback([]);
        } else {
            callback(rows);
        }
    });
}

module.exports = { saveMessage, getMessages };
