import { Card, CardContent } from "../ui/card";

export default function SummaryItem({
  title,
  value,
  color,
}: {
  title: string;
  value: string;
  color: string;
}) {
  return (
    <Card
      className="rounded-md py-4 shadow-sm w-full"
      style={{ backgroundColor: color }}
    >
      <CardContent className="flex flex-col items-center gap-2 ">
        <p className="text-md font-semibold text-gray-900">
          {title.toUpperCase()}
        </p>
        <p className="text-md text-gray-300">{value}</p>
      </CardContent>
    </Card>
  );
}
