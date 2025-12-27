import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";

import Image, { StaticImageData } from "next/image";

interface FeatureItemProps {
  image: StaticImageData;
  title: string;
  description: string;
}

export default function FeatureItem({
  image,
  title,
  description,
}: FeatureItemProps) {
  return (
    <Card className="max-w-100 h-90">
      <CardContent className="h-50">
        <Image
          src={image}
          alt="feature-image"
          className="w-full h-full rounded-lg"
        />
      </CardContent>
      <CardFooter className="flex flex-col items-start space-y-2">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardFooter>
    </Card>
  );
}
