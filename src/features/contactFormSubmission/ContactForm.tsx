import React, { useState } from 'react';
import { ContactFormData, ContactFormSubmissionResponse } from './types';
import { Button } from '../../shared/components/Button/Button';
import { useTheme } from '../../shared/context/ThemeContext';

export const ContactForm: React.FC = () => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [responseMessage, setResponseMessage] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setResponseMessage('');

    // Simulate API call
    try {
      const mockResponse: ContactFormSubmissionResponse = await new Promise((resolve) => {
        setTimeout(() => {
          if (formData.email.includes('@') && formData.message.length > 10) {
            resolve({ success: true, message: 'Your message has been sent successfully!' });
          } else {
            resolve({ success: false, message: 'Please fill out all fields correctly.' });
          }
        }, 1500);
      });

      if (mockResponse.success) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' }); // Clear form
      } else {
        setStatus('error');
      }
      setResponseMessage(mockResponse.message);
    } catch (error) {
      setStatus('error');
      setResponseMessage('An unexpected error occurred. Please try again.');
    }
  };

  const inputStyles: React.CSSProperties = {
    width: '100%',
    padding: '0.75rem',
    marginBottom: '1rem',
    borderRadius: '0.25rem',
    border: `1px solid ${theme === 'dark' ? 'var(--border-color-dark)' : 'var(--border-color-light)'}`,
    backgroundColor: theme === 'dark' ? 'var(--bg-color-dark)' : 'var(--card-bg-light)',
    color: theme === 'dark' ? 'var(--text-color-dark)' : 'var(--text-color-light)',
  };

  const textareaStyles: React.CSSProperties = {
    ...inputStyles,
    minHeight: '120px',
    resize: 'vertical',
  };

  const labelStyles: React.CSSProperties = {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: 'bold',
    color: theme === 'dark' ? 'var(--text-color-dark)' : 'var(--text-color-light)'
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="name" style={labelStyles}>Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          style={inputStyles}
        />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="email" style={labelStyles}>Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          style={inputStyles}
        />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="message" style={labelStyles}>Message:</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          style={textareaStyles}
        ></textarea>
      </div>
      <Button type="submit" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Sending...' : 'Send Message'}
      </Button>
      {responseMessage && (
        <p style={{
          marginTop: '1rem',
          color: status === 'success' ? 'green' : 'red'
        }}>
          {responseMessage}
        </p>
      )}
    </form>
  );
};
