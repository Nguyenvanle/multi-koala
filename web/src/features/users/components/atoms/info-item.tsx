export const InfoItem: React.FC<{
  icon: React.ElementType;
  label: string;
  value: string;
  className?: string;
}> = ({ icon: Icon, label, value, className = "" }) => (
  <div className={`flex flex-col ${className}`}>
    <h3 className="text-lg font-semibold text-gray-700 flex items-center mb-1">
      <Icon className="mr-2 text-primary" size={20} /> {label}
    </h3>
    <p className="text-gray-600 ml-7">{value}</p>
  </div>
);
