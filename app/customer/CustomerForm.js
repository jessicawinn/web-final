"use client";
import { useState } from 'react';
import Toast from './Toast';

export default function CustomerForm({ onCustomerAdded }) {
  const [form, setForm] = useState({
    name: '',
    dateOfBirth: '',
    memberNumber: '',
    interests: '',
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: '', type: '' });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setToast({ message: '', type: '' });
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE || ''}/api/customer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      
      if (res.ok) {
        const newCustomer = await res.json();
        setToast({ 
          message: `Customer "${newCustomer.name}" added successfully!`, 
          type: 'success' 
        });
        setForm({ name: '', dateOfBirth: '', memberNumber: '', interests: '' });
        // Notify parent component to refresh the list
        if (onCustomerAdded) {
          onCustomerAdded(newCustomer);
        }
      } else {
        const errorData = await res.json();
        setToast({ 
          message: `Error: ${errorData.error || 'Failed to add customer'}`, 
          type: 'error' 
        });
      }
    } catch (error) {
      setToast({ 
        message: 'Network error: Please check your connection', 
        type: 'error' 
      });
    }
    
    setLoading(false);
  }

  return (
    <div className="mb-8 bg-gray-50 p-6 rounded-lg border">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Add New Customer</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Customer Name *
            </label>
            <input 
              id="name"
              name="name" 
              value={form.name} 
              onChange={handleChange} 
              placeholder="Enter full name" 
              required 
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
            />
          </div>

          <div>
            <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">
              Date of Birth *
            </label>
            <input 
              id="dateOfBirth"
              name="dateOfBirth" 
              value={form.dateOfBirth} 
              onChange={handleChange} 
              type="date" 
              required 
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
            />
          </div>

          <div>
            <label htmlFor="memberNumber" className="block text-sm font-medium text-gray-700 mb-1">
              Member Number *
            </label>
            <input 
              id="memberNumber"
              name="memberNumber" 
              value={form.memberNumber} 
              onChange={handleChange} 
              type="number" 
              placeholder="e.g., 1001" 
              required 
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
            />
          </div>

          <div>
            <label htmlFor="interests" className="block text-sm font-medium text-gray-700 mb-1">
              Interests *
            </label>
            <input 
              id="interests"
              name="interests" 
              value={form.interests} 
              onChange={handleChange} 
              placeholder="e.g., movies, football, gaming" 
              required 
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
            />
            <p className="text-xs text-gray-500 mt-1">Separate multiple interests with commas</p>
          </div>
        </div>

        <button 
          type="submit" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed" 
          disabled={loading}
        >
          {loading ? 'Adding Customer...' : 'Add Customer'}
        </button>

      </form>

      <Toast 
        message={toast.message} 
        type={toast.type} 
        onClose={() => setToast({ message: '', type: '' })}
      />
    </div>
  );
}
