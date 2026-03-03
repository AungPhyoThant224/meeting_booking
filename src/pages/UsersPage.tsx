import { Heading, Table, IconButton, HStack, Box, Center, Spinner } from "@chakra-ui/react";
import { Trash2 } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import useUsers from "../hooks/users/useUsers";
import useUpdateUser from "../hooks/users/useUpdateUser";
import useDeleteUser from "../hooks/users/useDeleteUser";
import CreateUserModal from "../components/features/CreateUserModal";
import { NativeSelectField, NativeSelectRoot } from "@/components/ui/native-select";

const UsersPage = () => {
  const { user: currentUser } = useAuthStore();
  const { data, isLoading } = useUsers(1);
  const { mutate: updateRole } = useUpdateUser();
  const { mutate: deleteUser } = useDeleteUser();

  if (isLoading) return <Center h="200px"><Spinner /></Center>;

  const handleDelete = (id: string, name: string) => {
    const confirmed = window.confirm(
      `WARNING: Deleting user "${name}" will also permanently DELETE ALL BOOKINGS created by this user. Do you want to proceed?`
    );
    if (confirmed) deleteUser(id);
  };

  return (
    <Box p="4">
      <HStack justify="space-between" mb="6">
        <Heading size="lg">User Management</Heading>
        <CreateUserModal />
      </HStack>

      <Table.Root variant="line">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Name</Table.ColumnHeader>
            <Table.ColumnHeader>Role</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="right">Actions</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data?.data?.users.map((u) => (
            <Table.Row key={u.id}>
              <Table.Cell>{u.name} {u.id === currentUser?.id && "(You)"}</Table.Cell>
              <Table.Cell>
                <NativeSelectRoot size="sm" width="120px" 
                  disabled={u.id === currentUser?.id}
                >
                  <NativeSelectField
                    value={u.role}
                    onChange={(e) => updateRole({ id: u.id, role: e.currentTarget.value })}
                  >
                    <option value="USER">USER</option>
                    <option value="OWNER">OWNER</option>
                    <option value="ADMIN">ADMIN</option>
                  </NativeSelectField>
                </NativeSelectRoot>
              </Table.Cell>
              <Table.Cell textAlign="right">
                <IconButton
                  variant="ghost"
                  colorPalette="red"
                  disabled={u.id === currentUser?.id}
                  onClick={() => handleDelete(u.id, u.name)}
                >
                  <Trash2 size={16} />
                </IconButton>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
};

export default UsersPage;