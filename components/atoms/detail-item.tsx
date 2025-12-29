import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

interface DetailItemProps {
  title: string;
  content: string | false | undefined;
  className?: string;
}

export default function DetailItem({
  title,
  content,
  className,
}: DetailItemProps) {
  return (
    <Card className={`${className}`}>
      <CardHeader className="border-b">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <span className="text-sm">{content}</span>
      </CardContent>
    </Card>
  );
}
