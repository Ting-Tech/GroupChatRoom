/**
 * 定義應用層協定
 */
function encodeMessage(type, from, to, content) {
    const message = JSON.stringify({ type, from, to, content });
    return Buffer.from(message);
}

function decodeMessage(buffer) {
    try {
        return JSON.parse(buffer.toString());
    } catch (error) {
        return null; // 非法訊息
    }
}

module.exports = { encodeMessage, decodeMessage };
