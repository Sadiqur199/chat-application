import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = () => {
    const newUser = { id, password };

    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    
    const isUserExists = existingUsers.some(user => user.id === id);
    
    if (isUserExists) {
      alert('User ID already exists');
      return;
    }


    localStorage.setItem('users', JSON.stringify([...existingUsers, newUser]));
    alert('Account created successfully!');

    navigate('/login'); 
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-green-300 to-green-500">
      <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg text-center">
        
        <h3 className="text-lg font-bold text-green-700 mb-4">CREATE ACCOUNT</h3>
        
        <div className="mb-4">
          <input
            type="text"
            placeholder="Username"
            className="bg-green-100 text-green-800 p-3 rounded-full w-full mb-4 placeholder-gray-600"
            onChange={(e) => setId(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="bg-green-100 text-green-800 p-3 rounded-full w-full mb-4 placeholder-gray-600"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-full font-semibold"
          onClick={handleRegister}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;
