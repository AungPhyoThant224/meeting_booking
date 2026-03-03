import { 
  Heading, Spinner, Table, VStack, Box, Text, HStack, Center 
} from "@chakra-ui/react";
import { 
  PaginationItems, 
  PaginationNextTrigger, 
  PaginationPrevTrigger, 
  PaginationRoot 
} from "@/components/ui/pagination"; 
import { useState } from "react";
import useBookings from "../hooks/bookings/useBookings";

const BookingsPage = () => {
  const [page, setPage] = useState(1);
  
  const { data, isLoading, error } = useBookings(page);
    
  if (isLoading) return <Center h="200px"><Spinner /></Center>;
  
  if (error) return <Text color="red.500">Error loading bookings</Text>;

  const bookings = data?.data?.bookings || [];
  const meta = data?.data?.meta;

  return (
    <VStack align="stretch" gap="6" p="4">
      <Heading size="lg">Bookings</Heading>

      <Box bg="white" boxShadow="sm" borderRadius="md" border="1px solid" borderColor="gray.200">
        <Table.Root variant="line">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>User</Table.ColumnHeader>
              <Table.ColumnHeader>Start Time</Table.ColumnHeader>
              <Table.ColumnHeader>End Time</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <Table.Row key={booking.id}>
                  <Table.Cell fontWeight="medium">{booking.user?.name || "N/A"}</Table.Cell>
                  <Table.Cell>{new Date(booking.startTime).toLocaleString()}</Table.Cell>
                  <Table.Cell>{new Date(booking.endTime).toLocaleString()}</Table.Cell>
                </Table.Row>
              ))
            ) : (
              <Table.Row>
                <Table.Cell colSpan={3} textAlign="center">No bookings found</Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table.Root>
      </Box>

      {meta && meta.lastPage > 1 && (
        <Center mt="4">
          <PaginationRoot 
            count={meta.total} 
            pageSize={10} 
            page={page}
            onPageChange={(e) => setPage(e.page)}
          >
            <HStack>
              <PaginationPrevTrigger />
              <PaginationItems />
              <PaginationNextTrigger />
            </HStack>
          </PaginationRoot>
        </Center>
      )}
    </VStack>
  );
};

export default BookingsPage;