import { Box, Text, Button, VStack } from '@chakra-ui/react'
import { useAuthStore } from './store/useAuthStore'

function App() {
  const { user, logout } = useAuthStore();
  console.log("Current User:", user?.name); // Debugging line to check user state
  return (
    <Box p="8">
      <VStack gap="4">
        <Text fontSize="xl">
          {user ? `Welcome, ${user.name} (${user.role})` : "Not Logged In"}
        </Text>
        {user && <Button colorPalette="red" onClick={logout}>Logout</Button>}
      </VStack>
    </Box>
  )
}

export default App