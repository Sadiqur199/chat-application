import React, { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot, query, orderBy, doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../../firebaseconfiq';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [usernames, setUsernames] = useState({}); 
  useEffect(() => {
    const messagesQuery = query(collection(db, 'messages'), orderBy('createdAt', 'asc'));
    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const messagesList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(messagesList);
    });

    return () => unsubscribe(); 
  }, []);
  const sendMessage = async (e) => {
    e.preventDefault();
    if (message.trim()) {
      const user = auth.currentUser;

      let username = usernames[user.uid];
      if (!username) {
        const userDocRef = doc(db, 'users', user.uid); 
        const userDoc = await getDoc(userDocRef);
        username = userDoc.data()?.username || 'Anonymous'; 
        setUsernames(prev => ({ ...prev, [user.uid]: username })); 
      }
      await addDoc(collection(db, 'messages'), {
        uid: user.uid,
        username: username,
        text: message,
        createdAt: new Date().getTime(),
      });
      
      setMessage(''); 
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md md:mt-[200px]">
      <h2 className="text-xl font-bold mb-4">Chat Room</h2>
      <div className="h-64 overflow-y-auto border border-gray-300 mb-4 p-2 rounded">
        {messages.map((msg) => (
          <div key={msg.id} className={`p-2 shadow-sm ${msg.uid === auth.currentUser.uid ? 'text-right' : 'text-left'}`}>
            <strong className="font-semibold">{msg.username || 'Anonymous'}</strong>: {msg.text}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="flex">
        <input
          type="text"
          className="border border-gray-300 p-2 flex-grow rounded-l"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-r">
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
