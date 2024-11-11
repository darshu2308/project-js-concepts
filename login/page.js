'use client'
import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

const SimpleLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  emailjs.init("JmeV9mQ9eX2x-d7Yg"); // Replace with your public key

  const sendWelcomeEmail = async () => {
    const templateParams = {
      to_email: email,
      to_name: email.split('@')[0],
      subject: 'Welcome to Our Platform',
      message: `
        Dear ${email.split('@')[0]},
        
        Welcome to our platform! We're excited to have you here.
        
        Best regards,
        LOGICUBE IT 
      `
    };

    try {
      await emailjs.send(
        'service_qw02in8',    // Replace with your service ID
        'template_cndhamj',   // Replace with your template ID
        templateParams
      );
      return true;
    } catch (error) {
      console.error('Email error:', error);
      return false;
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setMessage('Please fill in all fields');
      return;
    }

    try {

      const emailSent = await sendWelcomeEmail();
      
      if (emailSent) {
        setMessage(`Login successful! Welcome email sent to ${email}`);
        // Clear form
        setEmail('');
        setPassword('');
      } else {
        setMessage('Login successful but failed to send welcome email');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-sm w-96">
        <h1 className="text-2xl mb-6 text-center">Login</h1>
        
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          {message && (
            <div className={`mb-4 p-2 text-center rounded ${
              message.includes('successful') 
                ? 'bg-green-100 text-green-700' 
                : 'bg-red-100 text-red-700'
            }`}>
              {message}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default SimpleLogin;