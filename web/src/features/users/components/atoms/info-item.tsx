export const InfoItem: React.FC<{
  icon: React.ElementType;
  label: string;
  value: string;
  className?: string;
}> = ({ icon: Icon, label, value, className = "" }) => (
  <div className={`flex flex-col ${className}`}>
    <h3 className="text-lg font-semibold flex items-center mb-1">
      <Icon className="mr-2 text-primary" size={20} /> {label}
    </h3>
    <p className="text-muted-foreground ml-7">{value}</p>
  </div>
);
