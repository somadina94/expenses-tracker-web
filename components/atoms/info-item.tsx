interface InfoItemProps {
  title: string;
  value: string;
}

export default function InfoItem({ title, value }: InfoItemProps) {
  return (
    <div className="p-2 border-b flex flex-row items-center justify-between">
      <span className="text-sm">{title}</span>
      <span className="text-sm">{value}</span>
    </div>
  );
}
