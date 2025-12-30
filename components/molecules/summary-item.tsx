import { Card, CardContent } from "../ui/card";

export default function SummaryItem({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <Card className="rounded-md py-2 shadow-sm w-full">
      <CardContent className="flex flex-col items-center gap-2 ">
        <p className="text-md">{title.toUpperCase()}</p>
        <p className="text-md">{value}</p>
      </CardContent>
    </Card>
  );
}
