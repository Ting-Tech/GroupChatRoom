# Secure Chat Application

A secure chat application implemented using Node.js. It utilizes the TLS protocol to ensure encrypted communication between clients and the server. This project also demonstrates custom socket programming with a focus on data security and extensible communication protocols.

## Features

- Encrypted communication using TLS.
- Multi-client chat with broadcast functionality.
- Simple and customizable message protocol.
- User identification with unique names for clients.
- SQLite integration for user and message history (extensible).

---

## Installation

### 1. Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or later)
- OpenSSL (for generating TLS certificates)

### 2. Clone the Repository

```bash
git clone <https://github.com/Ting-Tech/GroupChatRoom.git>
cd secure-chat
```

### 3. Install Dependencies

```bash
npm install
```

---

## TLS Certificate Setup

To enable secure communication, generate the required TLS certificate and private key:

1. Generate a private key:

   ```bash
   openssl genrsa -out server-key.pem 2048
   ```

2. Create a certificate signing request (CSR):

   ```bash
   openssl req -new -key server-key.pem -out server-cert.csr
   ```

3. Generate a self-signed certificate:
   ```bash
   openssl x509 -req -in server-cert.csr -signkey server-key.pem -out server-cert.pem -days 365
   ```

Ensure `server-key.pem` and `server-cert.pem` are in the root project directory.

---

## Usage

### Start the Server

Run the server in one terminal:

```bash
node server.js
```

Expected output:

```
Secure Chat Server running on port 8000
```

### Start a Client

Run the client in another terminal:

```bash
node client.js
```

Follow the prompt to enter a unique username.

Expected output:

```
Connected to server
Enter your username: Alice
```

### Chat Example

1. Type a message in the client terminal.
2. The message will be broadcast to all connected clients.
3. Each message will show the sender's name, e.g.:
   ```
   Alice: Hello, everyone!
   ```
4. Open multiple terminals to test with multiple clients.

---

## File Structure

```
secure-chat/
├── database.js      # Handles SQLite integration for message history (optional)
├── protocol.js      # Defines message structure and custom communication logic
├── server.js        # Chat server implementation using TLS
├── client.js        # Chat client implementation with interactive CLI
├── server-key.pem   # TLS private key (generated locally)
├── server-cert.pem  # TLS certificate (generated locally)
├── package.json     # Project dependencies and metadata
└── README.md        # Project documentation
```

---

## Protocol Design

The communication protocol uses JSON-encoded messages with the following structure:

```json
{
  "type": "broadcast",
  "from": "username",
  "to": "target_user_or_all",
  "content": "message_text"
}
```

### Message Types

- **broadcast**: Send a message to all connected clients.
- **private**: Send a private message to a specific client (future feature).

---

## Extensibility

1. **Database Integration**
   - Use `database.js` to log messages or maintain user information.
2. **Advanced Features**
   - Add user authentication.
   - Implement a WebSocket front-end.

---

## References

- [Node.js TLS Documentation](https://nodejs.org/api/tls.html)
- [Computer Networking: A Top-Down Approach](https://www.pearson.com/)
- OpenSSL documentation for generating certificates.

---

## License

This project is licensed under the MIT License. See `LICENSE` for details.
