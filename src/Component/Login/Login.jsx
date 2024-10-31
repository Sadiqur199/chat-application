import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  const [id, setId] = useState(''); 
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogin = async () => {
    try {
  
      const userCredential = await signInWithEmailAndPassword(auth, id, password);
      const user = userCredential.user;
      // localStorage.setItem('loggedInUser', JSON.stringify({ id: user.email, uid: user.uid }));
      navigate('/chat'); 
    } catch (error) {
      alert(error.message); 
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-green-300 to-green-500">
      <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg text-center">
        <div className="flex justify-center mb-4">
          <img
            src="https://i.ibb.co/26YhL0k/Screenshot-2024-10-31-155305.png"
            alt="Logo"
            className="w-14 h-14 rounded-full"
          />
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700">Welcome to BDevs Chat</h2>
          <p className="text-sm text-gray-500 mt-2">
            We Believe In Our Quality
          </p>
        </div>

        <button
          onClick={() => navigate('/register')}
          className="text-[#43B14B] font-medium mb-6"
        >
          Create Account
        </button>

        <h3 className="text-lg font-bold text-green-700 mb-4">USER LOGIN</h3>

        <div className="mb-4">
          <input
            type="email" 
            placeholder="Email"
            className="bg-green-100 text-green-800 p-3 rounded-full w-full mb-4 placeholder-gray-600"
            onChange={(e) => setId(e.target.value)}
            value={id}
          />
          <input
            type="password"
            placeholder="Password"
            className="bg-green-100 text-green-800 p-3 rounded-full w-full mb-4 placeholder-gray-600"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div className="flex justify-between mb-6 text-sm text-green-600">
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="form-checkbox" />
            <span>Remember</span>
          </label>
          <a href="#" className="hover:underline">Forgot Password?</a>
        </div>

        <button
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-full font-semibold"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
