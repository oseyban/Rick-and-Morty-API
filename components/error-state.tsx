import { Card, CardContent } from "@/components/ui/card";

interface ErrorStateProps {
  message: string;
}

export function ErrorState({ message }: ErrorStateProps) {
  return (
    <Card>
      <CardContent className="pt-6 text-sm text-red-600">{message}</CardContent>
    </Card>
  );
}
