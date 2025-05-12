import { Title, Card, SimpleGrid, Text, Badge } from "@mantine/core";
import { useGetBookCountQuery } from "../../../feature/slice/book.slice";

export function DashboardHome() {
  const { data: bookCount, isLoading } = useGetBookCountQuery("");

  const stat = {
    title: "Mes Livres",
    value: isLoading ? "..." : bookCount ?? "0",
    change: "+0%", 
    trend: "up",   
  };

  return (
    <div className="p-6 space-y-8">
      <Title order={1} className="text-3xl font-bold text-gray-800">
        Tableau de bord
      </Title>

      <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="lg">
        <Card
          shadow="sm"
          padding="lg"
          radius="md"
          withBorder
          className="hover:shadow-md transition-shadow duration-200 border border-gray-200"
        >
          <div className="flex flex-col h-full">
            <Text className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
              {stat.title}
            </Text>

            <div className="mt-4 flex items-end justify-between flex-grow">
              <Title order={2} className="text-2xl font-bold text-gray-800">
                {stat.value}
              </Title>

              <Badge
                color={stat.trend === "up" ? "teal" : "red"}
                variant="light"
                className="flex items-center gap-1"
              >
                {stat.trend === "up" ? (
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M12 7a1 1 0 01-1.7-.7l-2-3a1 1 0 111.7-1.4l2 3a1 1 0 010 1.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M12 13a1 1 0 01-.7.3 1 1 0 01-.7-.3l-2-3a1 1 0 111.4-1.4l2 3a1 1 0 010 1.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                {stat.change}
              </Badge>
            </div>
          </div>
        </Card>
      </SimpleGrid>
    </div>
  );
}
