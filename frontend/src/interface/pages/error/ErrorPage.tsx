import { Button, Title, Text } from "@mantine/core";
interface ErrorPageProps {
  title: string;
  message: string;
  onRetry: () => void;
}

export function ErrorPage({ title, message, onRetry }: ErrorPageProps) {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <Title order={1} className="text-4xl font-bold">
        {title}
      </Title>
      <Text size="xl" className="mb-8">
        {message}
      </Text>
      <Button onClick={onRetry}>
        Réessayer
      </Button>
    </div>
  );
}
