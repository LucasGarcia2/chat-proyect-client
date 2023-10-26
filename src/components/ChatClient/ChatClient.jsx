import React, { useState, useEffect } from 'react';
import './chatClient.css';
import io from 'socket.io-client';
import Picker from 'emoji-picker-react'

const socket = io('http://localhost:4000');

export const ChatClient = () => {

  const [message, setMessage] = useState('');
  const [username, setUserName] = useState('Admin');
  const [showPicker, setShowPicker] = useState(false);

  const onEmojiClick = (emojiObject) => {
    setMessage( prevInput => prevInput + emojiObject.emoji);
    setShowPicker(false);
  };

  const [listMessages, setListMessages] = useState([{
      body: "Bienvenido a la sala de chat",
      user: "Admin",
    }]);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit('message', {body: message, user: username});
    const newMsg = {
      body: message,
      user: username
    }
    setListMessages([...listMessages,newMsg]);
    setMessage('');
  }

  useEffect(() => {
    const receiveMessage = msg => {
      setListMessages([...listMessages, msg])      
    }
    socket.on( 'message', receiveMessage);
    
    return () => socket.off( 'message',receiveMessage);
  }, [listMessages])
  

  return (
    <>
      <input onChange={event => setUserName(event.target.value)} className='txt-username' type="text" placeholder='username' />

      <div className='div-chat'>
        { listMessages.map( (message, idx) => (
          <p key={message+idx}>{message.user}: {message.body}</p>
          ))
        }
      </div>              
    <form onSubmit={handleSubmit} className="form">
      <span className="title">Chat-Proyect</span>
      <p className="description">Podes abrir mas de una sesión y chatear con mas personas : )</p>
      <div className='div-type-chat'>
        <img
          className="emoji-icon"
          src="https://icons.getbootstrap.com/assets/icons/emoji-smile.svg"
          onClick={() => setShowPicker(!showPicker)} />
        {showPicker && <Picker className="prueba" onEmojiClick={onEmojiClick} />} 
        <input 
          value={message}
          placeholder="Escribe tu mensaje"
          onChange={ e => setMessage(e.target.value)}          
          type="text" name="text" id="chat-message"
          className="input-style" 
        />
        <button type="submit">Send</button>
      </div>
    </form>    
    </>
  )
}        