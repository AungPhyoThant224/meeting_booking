import { 
  Heading, Spinner, Table, VStack, Box, IconButton, Text, HStack, Center 
} from "@chakra-ui/react";
import { Trash2 } from "lucide-react";
import { 
  PaginationItems, 
  PaginationNextTrigger, 
  PaginationPrevTrigger, 
  PaginationRoot 
} from "@/components/ui/pagination"; 
import CreateBookingModal from "../components/features/CreateBookingModal";
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { canDeleteBooking } from "../utils/permissions";
import useBookings from "../hooks/bookings/useBookings";
import useDeleteBooking from "../hooks/bookings/useDeleteBooking";

const BookingsPage = () => {
  const { user } = useAuthStore();
  const [page, setPage] = useState(1);
  
  const { data, isLoading, error } = useBookings(page);
  const { mutate: deleteBooking, isPending: isDeleting } = useDeleteBooking();
    
  if (isLoading) return <Center h="200px"><Spinner /></Center>;
  
  if (error) return <Text color="red.500">Error loading bookings</Text>;

  const bookings = data?.data?.bookings || [];
  const meta = data?.data?.meta;

  return (
    <VStack align="stretch" gap="6" p="4">
      <HStack justify="space-between">
        <Heading size="lg">Meeting Room Bookings</Heading>
        <CreateBookingModal />
      </HStack>

      <Box bg="white" boxShadow="sm" borderRadius="md" border="1px solid" borderColor="gray.200">
        <Table.Root variant="line">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader fontWeight={"bold"} fontSize={"md"}>User</Table.ColumnHeader>
              <Table.ColumnHeader fontWeight={"bold"} fontSize={"md"}>Start Time</Table.ColumnHeader>
              <Table.ColumnHeader fontWeight={"bold"} fontSize={"md"}>End Time</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="right" fontWeight={"bold"} fontSize={"md"}>Actions</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <Table.Row key={booking.id}>
                  <Table.Cell fontWeight="medium">{booking.user?.name || "N/A"}</Table.Cell>
                  <Table.Cell>{new Date(booking.startTime).toLocaleString()}</Table.Cell>
                  <Table.Cell>{new Date(booking.endTime).toLocaleString()}</Table.Cell>
                  <Table.Cell textAlign="right">
                    {canDeleteBooking(user, booking) && (
                      <IconButton
                        aria-label="Delete booking"
                        variant="ghost"
                        colorPalette="red"
                        loading={isDeleting}
                        onClick={() => {
                          if (confirm("Are you sure you want to delete this booking?")) {
                            deleteBooking(booking.id);
                          }
                        }}
                      >
                        <Trash2 size={16} />
                      </IconButton>
                    )}
                  </Table.Cell>
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