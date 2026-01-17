import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface AuthCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function AuthCard({
  title,
  description,
  children,
  footer,
}: AuthCardProps) {
  return (
    <Card className="w-full max-w-md rounded-2xl px-4 py-8 shadow-lg sm:px-6 sm:py-10">
      <CardHeader className="space-y-1 px-0 sm:space-y-2">
        <CardTitle className="text-center text-xl font-bold sm:text-2xl">
          {title}
        </CardTitle>
        <CardDescription className="text-center text-xs sm:text-sm">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 px-0 sm:space-y-3">
        {children}
      </CardContent>
      {footer && (
        <CardFooter className="mt-4 flex flex-col space-y-3 px-0 pb-4 sm:mt-6 sm:space-y-4 sm:pb-6">
          {footer}
        </CardFooter>
      )}
    </Card>
  );
}
