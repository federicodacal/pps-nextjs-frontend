import React from 'react';

interface NotificationProps {
  message: string;
  type: 'error' | 'success' | 'info';
}

const Notification: React.FC<NotificationProps> = ({ message, type }) => {
  const getTypeStyles = (type: 'error' | 'success' | 'info') => {
    switch (type) {
      case 'error':
        return 'bg-red-600 text-white';
      case 'success':
        return 'bg-green-600 text-white';
      case 'info':
        return 'bg-blue-600 text-white';
      default:
        return '';
    }
  };

  return (
    <div className={`p-4 mb-4 mt-1 rounded-md ${getTypeStyles(type)} shadow-md`}>
      <b>{message}</b>
    </div>
  );
};

export default Notification;

