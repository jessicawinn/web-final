"use client";
import { useEffect, useState } from 'react';

export default function Toast({ message, type = 'success', onClose, duration = 3000 }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300); // Wait for fade out animation
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [message, duration, onClose]);

  if (!message) return null;

  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';
  const icon = type === 'success' ? '✓' : '✗';

  return (
    <div className={`fixed top-4 right-4 z-50 transform transition-all duration-300 ${
      isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
    }`}>
      <div className={`${bgColor} text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3 min-w-80`}>
        <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-white bg-opacity-20 rounded-full font-bold">
          {icon}
        </div>
        <div className="flex-1">
          <p className="font-medium">{message}</p>
        </div>
        <button 
          onClick={() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
          }}
          className="flex-shrink-0 text-white hover:text-gray-200 text-xl font-bold leading-none"
        >
          ×
        </button>
      </div>
    </div>
  );
}