"use client";
import { useState } from 'react';

export default function EditCustomerModal({ customer, onSave, onCancel }) {
  const [form, setForm] = useState({
    name: customer.name,
    dateOfBirth: customer.dateOfBirth.split('T')[0], // Format for date input
    memberNumber: customer.memberNumber,
    interests: customer.interests,
  });
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE || ''}/api/customer/${customer._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    
    if (res.ok) {
      const updatedCustomer = await res.json();
      onSave(updatedCustomer);
    }
    setLoading(false);
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h3 className="text-lg font-semibold mb-4">Edit Customer</h3>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <input 
              name="name" 
              value={form.name} 
              onChange={handleChange} 
              placeholder="Name" 
              required 
              className="w-full border p-2"
            />
            <input 
              name="dateOfBirth" 
              value={form.dateOfBirth} 
              onChange={handleChange} 
              type="date" 
              required 
              className="w-full border p-2"
            />
            <input 
              name="memberNumber" 
              value={form.memberNumber} 
              onChange={handleChange} 
              type="number" 
              required 
              className="w-full border p-2"
            />
            <input 
              name="interests" 
              value={form.interests} 
              onChange={handleChange} 
              placeholder="Interests" 
              required 
              className="w-full border p-2"
            />
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <button 
              type="button" 
              onClick={onCancel}
              className="bg-gray-500 text-white px-4 py-2"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="bg-blue-600 text-white px-4 py-2" 
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}