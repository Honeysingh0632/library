import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { baseurl } from "../Config/config";


export default function Chatbot() {
  
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([
    { type: 'bot', text: '👋 Hello! Welcome to our Library & Book Store. Are you looking to borrow or purchase a book today?' }
  ]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  const chatContainerRef = useRef(null);


  const books = [
    'Pride and Prejudice',
    'Treasure Island',
    'Symphony Of Trilogy',
    'Wellness And Paradise',
    'Fantasy Storytelling',
    'Sidhu Moose Wala',
    'The Last Ride',
    'Easy Fast Cooking'
  ];

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chat]);

  const handleInputChange = (e) => {
    const input = e.target.value;
    setMessage(input);

    // Real-time filtering suggestions based on typing
    if (input.length > 0) {
      const filtered = books.filter(book =>
        book.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  };
  

  const sendMessage = async (msg) => {
    const userMsg = msg || message;
    if (!userMsg) return;

    // Add user message
    setChat(prev => [...prev, { type: 'user', text: userMsg }]);
    setMessage('');
    setFilteredSuggestions([]);

    try {
      const res = await axios.post(`${baseurl}/api/chat-free`, { message: userMsg });
      setChat(prev => [...prev, { type: 'bot', text: res.data.reply }]);
    } catch (error) {
      setChat(prev => [...prev, { type: 'bot', text: "❌ Sorry, something went wrong." }]);
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div  style={{ width: '400px', margin: 'auto', padding: '20px', background: '#f5f5f5', borderRadius: '10px' }}>
        
      <div style={{ maxHeight: '300px', overflowY: 'auto', marginBottom: '10px' }}>
        {chat.map((msg, index) => (
          <div key={index} style={{ textAlign: msg.type === 'user' ? 'right' : 'left', margin: '8px 0' }}>
            <span style={{ background: msg.type === 'user' ? '#d1e7dd' : '#fff', padding: '8px 12px', borderRadius: '10px', display: 'inline-block' }}>
              {msg.text}
            </span>
          </div>
        ))}
      </div>

      <div style={{ padding: '10px', borderTop: '1px solid #ccc', background: '#fff' }}>
      <input
        type="text"
        value={message}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        placeholder="Type your message..."
        style={{ width: '70%', padding: '10px' }}
      />
      <button onClick={() => sendMessage()} style={{ padding: '10px', marginLeft: '10px' }} className='btn btn-dark'>Send</button>
    </div>
      {/* Real-time Suggestions */}
      {filteredSuggestions.length > 0 && (
        <div style={{ background: '#fff', padding: '10px', borderRadius: '8px', marginTop: '8px' }}>
          <p style={{ fontWeight: 'bold' }}>📚 Suggestions:</p>
          {filteredSuggestions.map((suggest, i) => (
            <div
              key={i}
              onClick={() => sendMessage(suggest)}
              style={{ padding: '8px', cursor: 'pointer', borderBottom: '1px solid #ccc' }}
            >
              {suggest}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
