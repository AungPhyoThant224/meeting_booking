import { Box, Button, Heading, VStack, ClientOnly, Skeleton } from '@chakra-ui/react'
import { useColorMode } from "@/components/ui/color-mode"
import { Sun, Moon } from 'lucide-react'

function App() {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Box p="8">
      <VStack gap="4">
        <Heading>Meeting Room Booking</Heading>
        
        <ClientOnly fallback={<Skeleton h="10" w="40" />}>
          <Button 
            onClick={toggleColorMode}
            variant="solid"
            colorPalette="teal"
          >
            {colorMode === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            Toggle {colorMode === 'light' ? 'Dark' : 'Light'} Mode
          </Button>
        </ClientOnly>
      </VStack>
    </Box>
  )
}

export default App