export default function LoadingSpinner({ text = 'Chargement...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="spinner w-8 h-8 border-3 mb-4" />
      <p className="text-gray-500 text-sm">{text}</p>
    </div>
  );
}
