import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const QuizSection: React.FC = () => (
  <Card>
    <CardHeader>
      <CardTitle>Lesson Quiz</CardTitle>
    </CardHeader>
    <CardContent>
      <p>Quiz content will be integrated here in the future.</p>
      <Button className="mt-4">Start Quiz</Button>
    </CardContent>
  </Card>
);
