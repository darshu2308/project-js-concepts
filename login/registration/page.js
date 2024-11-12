"use client"; // Mark as a Client Component

import { useState } from 'react';
import emailjs from 'emailjs-com';

// EmailJS configuration
const serviceId = 'service_qw02in8';
const templateId = 'template_cndhamj';
const userId = 'JmeV9mQ9eX2x-d7Yg';

// In-memory user store (for demonstration purposes)
let users = [];

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Function to send a welcome email
  async function sendWelcomeEmail(email) {
    try {
      const templateParams = {
        to_email: email,
        from_name: 'My App',
        message: 'Welcome to our app!'
      };

      await emailjs.send(serviceId, templateId, templateParams, userId);
      console.log(`Sent welcome email to ${email}`);
    } catch (error) {
      console.error('Error sending welcome email:', error);
      throw error;
    }
  }

  async function handleRegister() {
    setError(''); // Reset error message
    setSuccess(''); // Reset success message
    try {
      // Check if the user already exists
      const existingUser = users.find(user => user.email === email);
      if (existingUser) {
        throw new Error('User already exists.');
      }

      // Add user to the in-memory store
      users.push({ email, password });
      await sendWelcomeEmail(email); // Send welcome email after registration
      setSuccess('Registration successful! You can now log in.'); // Set success message
      setEmail(''); // Clear email input
      setPassword(''); // Clear password input
    } catch (error) {
      setError(error.message); // Set error message to display
      console.error('Error registering user:', error);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold text-center">Register</h1>
        {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
        {success && <p className="text-green-500">{success}</p>} {/* Display success message */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mt-4"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mt-4"
        />
        <button
          onClick={handleRegister}
          className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600"
        >
          Register
        </button>
        <p className="mt-4 text-center">
          Already have an account? <a href="/login" className="text-blue-500">Login here</a>
        </p>
      </div>
    </div>
  );
}