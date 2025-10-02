"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import EditCustomerModal from './EditCustomerModal';

export default function CustomerList({ refreshTrigger }) {
  const router = useRouter();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCustomer, setEditingCustomer] = useState(null);

  const fetchCustomers = () => {
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_BASE || ''}/api/customer`)
      .then(res => res.json())
      .then(data => {
        setCustomers(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCustomers();
  }, [refreshTrigger]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-2">All Customers</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Date of Birth</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Member Number</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Interests</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(c => (
            <tr key={c._id}>
              <td className="border border-gray-300 px-4 py-2">
                <button 
                  onClick={() => router.push(`/customer/${c._id}`)}
                  className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                >
                  {c.name}
                </button>
              </td>
              <td className="border border-gray-300 px-4 py-2">{new Date(c.dateOfBirth).toLocaleDateString()}</td>
              <td className="border border-gray-300 px-4 py-2">{c.memberNumber}</td>
              <td className="border border-gray-300 px-4 py-2">{c.interests}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  className="bg-red-500 text-white px-2 py-1 mr-2"
                  onClick={async () => {
                    if (confirm('Delete this customer?')) {
                      await fetch(`${process.env.NEXT_PUBLIC_API_BASE || ''}/api/customer/${c._id}`, { method: 'DELETE' });
                      setCustomers(customers.filter(x => x._id !== c._id));
                    }
                  }}
                >Delete</button>
                <button
                  className="bg-yellow-500 text-white px-2 py-1"
                  onClick={() => setEditingCustomer(c)}
                >Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {editingCustomer && (
        <EditCustomerModal
          customer={editingCustomer}
          onSave={(updatedCustomer) => {
            setCustomers(customers.map(c => 
              c._id === updatedCustomer._id ? updatedCustomer : c
            ));
            setEditingCustomer(null);
          }}
          onCancel={() => setEditingCustomer(null)}
        />
      )}
    </div>
  );
}
