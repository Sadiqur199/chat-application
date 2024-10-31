import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../../firebaseconfiq'; 
const Register = () => {
  const [username, setUsername] = useState(''); 
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, id, password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: username });

      await setDoc(doc(db, 'users', user.uid), {
        username: username, 
        email: id           
      });

      alert('Account created successfully! You can now log in.');
      navigate('/login');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-green-300 to-green-500">
      <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg text-center">
        
        <h3 className="text-lg font-bold text-green-700 mb-4">CREATE ACCOUNT</h3>
        
        <div className="mb-4">
          <input
            type="text" 
            placeholder="Username"
            className="bg-green-100 text-green-800 p-3 rounded-full w-full mb-4 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400"
            onChange={(e) => setUsername(e.target.value)} 
          />
          <input
            type="email"
            placeholder="Email"
            className="bg-green-100 text-green-800 p-3 rounded-full w-full mb-4 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400"
            onChange={(e) => setId(e.target.value)}
            value={id}
          />
          <input
            type="password"
            placeholder="Password"
            className="bg-green-100 text-green-800 p-3 rounded-full w-full mb-4 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <button
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-full font-semibold transition duration-300"
          onClick={handleRegister}
        >
          Register
        </button>

        <p className="mt-4 text-sm text-gray-600">
          Already have an account? <a href="/login" className="text-green-600 hover:underline">Log In</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
