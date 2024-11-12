"use client"; // Mark as a Client Component

import { useState } from 'react';
import emailjs from 'emailjs-com';

// EmailJS configuration
const serviceId = 'service_qw02in8';
const templateId = 'template_cndhamj';
const userId = 'JmeV9mQ9eX2x-d7Yg';

// In-memory user store (for demonstration purposes)
let users = []; // This should be the same reference as in the registration page

export default function LoginPage() {
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
        message: 'Welcome back to our app!'
      };

      await emailjs.send(serviceId, templateId, templateParams, userId);
      console.log(`Sent welcome email to ${email}`);
    } catch (error) {
      console.error('Error sending welcome email:', error);
      throw error;
    }
  }

  async function handleLogin() {
    setError(''); // Reset error message
    setSuccess(''); // Reset success message
    try {
      // Check credentials against the in-memory user store
      const user = users.find(user => user.email === email && user.password === password);
      if (!user) {
        throw new Error('Invalid email or password.');
      }

      await sendWelcomeEmail(email); // Send welcome email after login
      setSuccess('Login successful!'); // Set success message
      setEmail(''); // Clear email input
      setPassword(''); // Clear password input
    } catch (error) {
      setError(error.message); // Set error message to display
      console.error('Error logging in user:', error);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold text-center">Login</h1>
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
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600"
        >
          Login
        </button>
        <p className="mt-4 text-center">
          Don't have an account? <a href="/login/registration" className="text-blue-500">Register here</a>
        </p>
      </div>
    </div>
  );
}