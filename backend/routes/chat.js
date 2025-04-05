const express = require('express');
const router = express.Router();
const OpenAI = require('openai');
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Correct usage in v4
});

router.post('/chat', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',  // or 'gpt-4'
      messages: [
        { role: 'system', content: process.env.SYSTEM_PROMPT },
        { role: 'user', content: message }],
      max_tokens: 200,
    });

    res.json({ reply: response.choices[0].message.content });
  } catch (error) {
    console.error('OpenAI Error:', error.response?.data || error.message);
  res.status(500).json({ error: 'Failed to fetch response from OpenAI' });
  }
});

const books = [
    "Pride and Prejudice",
    "Treasure Island",
    "Symphony Of Trilogy",
    "Wellness And Paradise",
    "Fantasy Storytelling",
    "Sidhu Moose Wala",
    "The Last Ride",
    "Easy Fast Cooking",
  ];
  
  
  // Temporary memory (optional: move this to session/db in production)
  
  router.post('/chat-free', (req, res) => {
    const userMessage = req.body.message?.toLowerCase();
    let botReply = "I'm sorry, I didn't understand that. You can ask for available books or search a book.";
    let userName = '';
  
    if (!userMessage) return res.json({ reply: botReply });
  
    // Greeting
    if (userMessage.includes('hello') || userMessage.includes('hi') || userMessage === 'h') {
      botReply = 'Hello! Welcome to our Library and Book Store. May I know your name? 😊';
    } 
    // Capturing name if user says "My name is..."
    else if (userMessage.includes('my name is') || userMessage.includes('name is') || userMessage.includes('name')) {
      const nameMatch = userMessage.match(/(?:my name is|name is|name)\s+([a-zA-Z]+)/);
      if (nameMatch && nameMatch[1]) {
        userName = nameMatch[1].charAt(0).toUpperCase() + nameMatch[1].slice(1);
        botReply = `Nice to meet you, ${userName}! Would you like to buy or borrow a book? 📚`;
      } else {
        botReply = "Sorry, I didn't catch your name. Can you please tell me your name?";
      }
    } 
    // Book List
    else if (userMessage.includes('available books') || userMessage.includes('list')) {
      botReply = `Here are some available books: ${books.join(', ')}. Which one are you interested in?`;
    } 
    // Buy or Purchase
    else if (userMessage.includes('buy') || userMessage.includes('purchase')) {
      botReply = 'Great! Please tell me the name of the book or the author you\'re looking for.';
    } 
    // Borrow
    else if (userMessage.includes('borrow')) {
      botReply = 'Sure! Which book would you like to borrow? Please provide the title or author.';
    } 
    // Check if user mentioned a book
    else {
      const foundBook = books.find(book => userMessage.includes(book.toLowerCase()));
      if (foundBook) {
        botReply = `"${foundBook}" is available. Please log in or register to continue: https://first-project-ffm0.onrender.com/Newadd`;
      } 
      // Only treat one-word input as a name IF it's not a keyword like 'buy' or 'borrow'
      else if (userMessage.split(' ').length === 1 && /^[a-zA-Z]+$/.test(userMessage) 
              && userMessage !== 'buy' && userMessage !== 'borrow') {
        userName = userMessage.charAt(0).toUpperCase() + userMessage.slice(1);
        botReply = `Nice to meet you, ${userName}! Would you like to buy or borrow a book? 📚`;
      }
    }
  
    res.json({ reply: botReply });
  });
  
module.exports = router;
