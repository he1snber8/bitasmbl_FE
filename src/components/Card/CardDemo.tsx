import { Card } from "@material-tailwind/react";
import { CardSkeletonContainer } from "./CardSkeletonContainer";
import { Skeleton } from "../Skeleton";
import { CardTitle } from "./CardTitle";
import { CardDescription } from "./CardDescription";

export function CardDemo() {
  return (
    <Card>
      A card that showcases a set of tools that you use to create your product.
    </Card>
  );
}
