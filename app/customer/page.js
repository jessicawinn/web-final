"use client";
import { useState } from 'react';
import CustomerList from './CustomerList';
import CustomerForm from './CustomerForm';

export default function CustomerPage() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleCustomerAdded = (newCustomer) => {
    // Trigger a refresh of the customer list
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <main className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Customer Management</h1>
      <CustomerForm onCustomerAdded={handleCustomerAdded} />
      <CustomerList refreshTrigger={refreshTrigger} />
    </main>
  );
}
