import { AlertCircle } from 'lucide-react';

export default function EmptyState({ title, message, action }) {
  return (
    <div className="text-center py-12">
      <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-1">{title}</h3>
      <p className="text-gray-500 text-sm mb-4">{message}</p>
      {action}
    </div>
  );
}
