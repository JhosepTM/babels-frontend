import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function NotFound() {
  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <Card className="w-[420px] shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="lg:text-7xl text-4xl">401</CardTitle>
          <CardDescription className="text-lg mt-4">
            Lo siento, no tienes permiso para acceder a esta página.
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-center">
          <Button asChild>
            <Link to="javascript:void(0)" onClick={goBack}>
              Go Back
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
