import { Box, Heading, VStack, HStack, Input, Spinner, Center, Text, SimpleGrid } from "@chakra-ui/react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from "recharts";
import { useState } from "react";
import useSummary from "../hooks/summary/useSummary";
import { getLocalDateRange, getTodayString } from "@/utils/dateHelper";

const COLORS = ["#319795", "#3182ce", "#805ad5", "#d53f8c", "#dd6b20"];

const DashboardPage = () => {
  const [startDateStr, setStartDateStr] = useState(getTodayString());
  const [endDateStr, setEndDateStr] = useState(getTodayString());

  const dateRange = {
    start: getLocalDateRange(startDateStr).start,
    end: getLocalDateRange(endDateStr).end,
  };

  const { data, isLoading, error } = useSummary(dateRange.start, dateRange.end);

  if (isLoading) return <Center h="400px"><Spinner /></Center>;

  if (error) return <Text color="red.500">Error loading dashboard</Text>;

  const chartData = data?.data?.usageSummary.map((item) => ({
    name: item.name,
    count: item._count.bookings,
  })) || [];

  return (
    <VStack align="stretch" gap="8" p="6">
      <HStack justify="space-between" wrap="wrap" gap="4">
        <VStack align="flex-start" gap="0">
          <Heading size="lg">Booking Analytics</Heading>
          <Text color="gray.500">Data from {startDateStr} to {endDateStr}</Text>
        </VStack>

        <HStack gap="4">
          <Box>
            <Text fontSize="xs" fontWeight="bold" mb="1">From</Text>
            <Input 
                type="date" 
                value={startDateStr} 
                onChange={(e) => setStartDateStr(e.target.value)} 
            />
          </Box>
          <Box>
            <Text fontSize="xs" fontWeight="bold" mb="1">To</Text>
            <Input 
                type="date" 
                value={endDateStr} 
                onChange={(e) => setEndDateStr(e.target.value)} 
            />
          </Box>
        </HStack>
      </HStack>

      <SimpleGrid columns={{ base: 1, lg: 2 }} gap="6">
        <Box p="6" bg="white" borderRadius="lg" boxShadow="sm" border="1px solid" borderColor="gray.100">
          <Heading size="md" mb="6">Bookings by User</Heading>
          <Box h="300px" w="100%">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" fontSize={12} />
                <YAxis allowDecimals={false} fontSize={12} />
                <Tooltip cursor={{ fill: "#f7fafc" }} />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {chartData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Box>

        <VStack align="stretch" gap="4">
          <Box p="6" bg="teal.500" color="white" borderRadius="lg" boxShadow="sm">
            <Text fontSize="sm" fontWeight="bold">Total Bookings</Text>
            <Heading size="2xl">
              {chartData.reduce((acc, curr) => acc + curr.count, 0)}
            </Heading>
          </Box>
          <Box p="6" bg="white" borderRadius="lg" boxShadow="sm" border="1px solid" borderColor="gray.100">
            <Heading size="sm" mb="4">Detailed Schedule</Heading>
            <VStack align="stretch" maxH="200px" overflowY="auto" gap="3">
              {data?.data?.groupedBookings.map((group) => (
                <Box key={group.id} borderLeft="4px solid" borderColor="teal.500" pl="3">
                  <Text fontWeight="bold" fontSize="sm">{group.name}</Text>
                  {group.bookings.map((b) => (
                    <Text key={b.id} fontSize="xs" color="gray.600">
                      {new Date(b.startTime).toLocaleString()} - 
                      {new Date(b.endTime).toLocaleString()}
                    </Text>
                  ))}
                </Box>
              ))}
            </VStack>
          </Box>
        </VStack>
      </SimpleGrid>
    </VStack>
  );
};

export default DashboardPage;