import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";

import Image, { StaticImageData } from "next/image";

interface FeatureItemProps {
  image: StaticImageData;
  description: string;
}

export default function HowItWorksItem({
  image,
  description,
}: FeatureItemProps) {
  return (
    <Card className="max-w-100 w-full h-110">
      <CardContent className="h-80 border-b">
        <Image
          src={image}
          alt="feature-image"
          className="w-full h-full rounded-lg"
        />
      </CardContent>
      <CardFooter className="flex flex-col items-start space-y-2">
        <CardDescription className="text-center">{description}</CardDescription>
      </CardFooter>
    </Card>
  );
}
