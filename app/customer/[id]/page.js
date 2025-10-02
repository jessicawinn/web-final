"use client";
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function CustomerDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`${process.env.NEXT_PUBLIC_API_BASE || ''}/api/customer/${id}`)
        .then(res => {
          if (!res.ok) {
            throw new Error('Customer not found');
          }
          return res.json();
        })
        .then(data => {
          setCustomer(data);
          setLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [id]);

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this customer?')) {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE || ''}/api/customer/${id}`, {
          method: 'DELETE'
        });
        
        if (res.ok) {
          alert('Customer deleted successfully');
          router.push('/customer');
        } else {
          alert('Failed to delete customer');
        }
      } catch (error) {
        alert('Error deleting customer');
      }
    }
  };

  if (loading) {
    return (
      <div className="p-8 max-w-2xl mx-auto">
        <div className="text-center">Loading customer details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 max-w-2xl mx-auto">
        <div className="text-red-600 text-center">Error: {error}</div>
        <div className="text-center mt-4">
          <button 
            onClick={() => router.push('/customer')}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Back to Customer List
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Customer Details</h1>
          <button 
            onClick={() => router.push('/customer')}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            ← Back to List
          </button>
        </div>

        {customer && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Customer Name
                  </label>
                  <div className="text-lg font-semibold text-gray-900 bg-gray-50 p-3 rounded">
                    {customer.name}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Member Number
                  </label>
                  <div className="text-lg font-semibold text-gray-900 bg-gray-50 p-3 rounded">
                    #{customer.memberNumber}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date of Birth
                  </label>
                  <div className="text-lg text-gray-900 bg-gray-50 p-3 rounded">
                    {new Date(customer.dateOfBirth).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Age
                  </label>
                  <div className="text-lg text-gray-900 bg-gray-50 p-3 rounded">
                    {Math.floor((new Date() - new Date(customer.dateOfBirth)) / (365.25 * 24 * 60 * 60 * 1000))} years old
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Interests
              </label>
              <div className="bg-gray-50 p-3 rounded">
                <div className="flex flex-wrap gap-2">
                  {customer.interests.split(',').map((interest, index) => (
                    <span 
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {interest.trim()}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* <div className="pt-6 border-t">
              <div className="flex space-x-4">
                <button 
                  onClick={() => router.push(`/customer?edit=${customer._id}`)}
                  className="bg-yellow-600 text-white px-6 py-2 rounded hover:bg-yellow-700"
                >
                  Edit Customer
                </button>
                <button 
                  onClick={handleDelete}
                  className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
                >
                  Delete Customer
                </button>
              </div>
            </div> */}

            <div className="pt-4 text-sm text-gray-500">
              <p>Customer ID: {customer._id}</p>
              <p>Record created: {new Date(customer.createdAt || Date.now()).toLocaleString()}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}