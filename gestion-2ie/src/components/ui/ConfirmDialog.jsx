import { AlertTriangle } from 'lucide-react';

export default function ConfirmDialog({ isOpen, onClose, onConfirm, title, message, loading }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content max-w-sm" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mb-4">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-500 text-sm mb-6">{message}</p>
          
          <div className="flex gap-3 justify-center">
            <button
              onClick={onClose}
              disabled={loading}
              className="btn btn-secondary"
            >
              Annuler
            </button>
            <button
              onClick={onConfirm}
              disabled={loading}
              className="btn btn-danger flex items-center gap-2"
            >
              {loading && <span className="spinner border-white border-t-transparent" />}
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
