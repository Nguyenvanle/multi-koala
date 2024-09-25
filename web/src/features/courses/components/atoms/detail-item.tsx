export const DetailItem: React.FC<{ icon: React.ReactNode; text: string }> = ({
  icon,
  text,
}) => {
  return (
    <div className="mt-4 flex items-center">
      {icon}
      <span className="ml-2 text-sm text-gray-600">{text}</span>
    </div>
  );
};
