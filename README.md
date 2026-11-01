# React Chat App

An interactive single-page chat application built using React.js, JavaScript, HTML and CSS.

## Features

- Random Usernames: Automatically assigns a username to each message from a predefined list (Alan, Bob, Carol, Dean and Elin).
- Dynamic User Avatars: Displays user initials with randomly generated colors.
- Interactive Messaging: Send and display messages with usernames and timestamps.
- Message Likes: Like messages using a heart icon and view the updated like count.
- emoji Picker:Select and insert emojis into chat messages.
- @Mentions: Display username suggestions from the predefined user list.
- Keyboard Navigation: Navigate mention suggestions using Arrow Up, Arrow Down, Enter and Escape.
- Mention Highlighting: Highlights valid usernames mentioned using @.
- Automatic Scrolling: Automatically scrolls to newly added messages.
- Responsive Layout: Chat interface adapts to different screen sizes.

## Technologies Used

- React.js
- JavaScript (ES6+)
- HTML5
- CSS3
- Vite
- Emoji Picker React
- Font Awesome

## Getting Started

### Prerequisites

Install Node.js and npm.

### Installation

Clone the repository:

```bash
git clone https://github.com/0628-rian/chat-app.git
```

Navigate to the project directory:

```bash
cd chat-app
```

Install dependencies:

```bash
npm install
```

### Run the Application

```bash
npm run dev
```

Open the local URL displayed in the terminal, usually `http://localhost:5173/`.

## Stretch Goals

### Implemented

1. Emoji Integration: Added an emoji picker to insert emojis into chat messages.
2. @Mentions: Added username suggestions, keyboard navigation and highlighting of valid mentions.

### Not Implemented

3. Socket.IO Communication: Express.js server and Socket.IO client-server communication have not been implemented.

## Limitations

- Messages and likes are stored using React state and are not persisted after a page refresh.
- Usernames and liker assignments are simulated using a predefined list.
- The application does not currently support real-time multi-user communication through a backend.

## Author

Developed as a React.js chat application assignment.
