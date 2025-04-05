import { useState } from 'react';
import Chatbot from './chat';
 // Import your Chatbot component

export default function ChatLauncher() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: 'fixed', bottom: '60px', right: '20px', zIndex: 999 }}>
      {/* Chat Bubble */}
      {!open && (
        <div
          onClick={() => setOpen(true)}
          style={{
            background: '#fff',
            padding: '10px',
            borderRadius: '12px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            cursor: 'pointer',
            maxWidth: '220px',
            color: '#000'
          }}
        >
          <div className='hide-on-mobile' style={{ fontSize: '30px' }}>👋</div>
          <div  className='hide-on-mobile'>
            Hi, I am <b>Siri</b> 😊 <br />
            How Can I Help You?
          </div>
          {/* Avatar */}
          <div style={{ position: 'absolute', bottom: '-40px', right: '-10px' }}>
            <img
              src={require('./images/avtar.png')} // Replace with your avatar or image
              alt="Siya"
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                border: '3px solid #fff',
                background: '#fff',
              }}
            />
            <span
              style={{
                width: '12px',
                height: '12px',
                background: 'green',
                borderRadius: '50%',
                border: '2px solid #fff',
                position: 'absolute',
                bottom: '5px',
                right: '5px',
              }}
            ></span>
          </div>
        </div>
      )}

      {/* Chatbot Page */}
      {open && (
        <div style={{
          width: '400px',
          height: '500px',
          background: '#fff',
          borderRadius: '10px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          position: 'relative'
        }}>
          <button onClick={() => setOpen(false)} style={{ position: 'absolute', top: '10px', right: '10px',border:'none' }}>❌</button>
       <Chatbot/>
        </div>
      )}
    </div>
  );
}
