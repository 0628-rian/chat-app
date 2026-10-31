import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import "./App.css";

// List of usernames provided in the assignment
const user_list = ["Alan", "Bob", "Carol", "Dean", "Elin"];

function generateRandomColor() {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 65%, 65%)`;
}

function App() {
  // Store all chat messages
  const [messages, setMessages] = useState([]);

  // Store the text typed in the input box
  const [input, setInput] = useState("");
  //add emoji panel
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [userColors] = useState(() => {
    return Object.fromEntries(
      user_list.map((user) => [user, generateRandomColor()]),
    );
  });
  const [showMentions, setShowMentions] = useState(false);
  // Function to send a message
  function handleSend(event) {
    // Prevent the browser from refreshing the page
    event.preventDefault();

    // Remove unnecessary spaces from the message
    const messageText = input.trim();

    // Do not send an empty message
    if (messageText === "") {
      return;
    }

    // Generate a random index from the username list
    const randomIndex = Math.floor(Math.random() * user_list.length);

    // Select a random username
    const randomUser = user_list[randomIndex];

    setParticipants((previous) =>
      previous.includes(randomUser) ? previous : [...previous, randomUser],
    );

    // Create a new message object
    const newMessage = {
      id: Date.now() + Math.random(),
      username: randomUser,
      message: messageText,
      likes: 0,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    // Add the new message to the existing messages
    setMessages((previousMessages) => [...previousMessages, newMessage]);

    // Clear the input box
    setInput("");
  }
  function handleMentionSelect(username) {
    const updatedText = input.replace(/@[^@\s]*$/i, `@${username} `);

    setInput(updatedText);
    setShowMentions(false);
  }
  function highlightMentions(message) {
    const mentionPattern = /@(Alan|Bob|Carol|Dean|Elin)\b/gi;

    return message.split(mentionPattern).map((part, index) => {
      const matchedUser = user_list.find(
        (user) => user.toLowerCase() === part.toLowerCase(),
      );

      if (matchedUser) {
        return (
          <span className="mentioned-user" key={index}>
            @{part}
          </span>
        );
      }

      return part;
    });
  }
  // Function to increase the like count
  function handleLike(id) {
    setMessages((previousMessages) =>
      previousMessages.map((message) => {
        if (message.id === id) {
          // Maximum likes cannot exceed total users
          if (message.likes >= user_list.length) {
            return message;
          }

          return {
            ...message,
            likes: message.likes + 1,
          };
        }

        return message;
      }),
    );
  }

  // Display the chat application
  return (
    <div className="chat-container">
      {/* Chat Header */}
      <header className="chat-header">
        <div>
          <h2>Introductions</h2>
          <p>This Channel Is For Company Wide Chatter</p>
        </div>
        <div className="members">
          <span>
            {participants.length} | {user_list.length}
          </span>
          <FontAwesomeIcon icon={faUserGroup} />
        </div>
      </header>

      {/* Chat Message Area */}
      <div className="chat-messages">
        {/* Display welcome message when there are no chats */}
        {messages.length === 0 && (
          <div className="empty-message">
            <h3>Welcome to Team Chat!</h3>
            <p>Send a message to start interacting.</p>
          </div>
        )}

        {/* Display all messages */}
        {messages.map((message) => (
          <div className="message-row" key={message.id}>
            {/* User Avatar */}
            <div
              className="avatar"
              style={{ backgroundColor: userColors[message.username] }}
            >
              {message.username.charAt(0)}
            </div>

            {/* Message Details */}
            <div className="message-content">
              {/* Username and Time */}
              <div className="message-info">
                <strong>{message.username}</strong>
                <span>{message.time}</span>
              </div>

              {/* Actual Chat Message */}
              <div className="message-bubble">
                {highlightMentions(message.message)}
              </div>

              {/* Like Button and Count */}
              <div className="like-section">
                <button
                  type="button"
                  onClick={() => handleLike(message.id)}
                  aria-label="Like message"
                >
                  ♡
                </button>

                <span>{message.likes}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input Form */}

      <form className="chat-input" onSubmit={handleSend}>
        {showMentions && (
          <div className="mention-list">
            {user_list
              .filter((user) =>
                user
                  .toLowerCase()
                  .startsWith(
                    input.match(/@([^@\s]*)$/)?.[1]?.toLowerCase() || "",
                  ),
              )
              .map((user) => (
                <button
                  type="button"
                  key={user}
                  className="mention-item"
                  onClick={() => handleMentionSelect(user)}
                >
                  {user}
                </button>
              ))}
          </div>
        )}
        {/* Emoji picker panel */}
        {showEmojiPicker && (
          <div className="emoji-picker">
            <EmojiPicker
              className="custom-emoji-picker"
              height={400}
              width={270}
              emojiSize={16}
              theme="dark"
              previewConfig={{
                showPreview: true,
                defaultCaption: "Select an emoji",
              }}
              skinTonesDisabled={false}
              skinTonePickerLocation="PREVIEW"
              lazyLoadEmojis={true}
              onEmojiClick={(emojiData) => {
                setInput((previous) => previous + emojiData.emoji);
              }}
            />
          </div>
        )}

        {/* Textbox */}
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(event) => {
            const value = event.target.value;
            setInput(value);
            setShowMentions(/@[^@\s]*$/.test(value));
          }}
        />

        {/* Emoji button */}
        <button
          type="button"
          className="emoji-toggle"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        >
          ☺
        </button>

        {/* Send button */}
        <button type="submit" className="send-button">
          ➤
        </button>
      </form>
    </div>
  );
}

export default App;
