import { Box, Flex, VStack, Text, Link, Button } from "@chakra-ui/react";
import { Link as RouterLink, Outlet } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { LayoutDashboard, Calendar, Users, LogOut } from "lucide-react";

const MainLayout = () => {
  const { user, logout } = useAuthStore();

  const navItems = [
    { name: "Bookings", path: "/bookings", icon: <Calendar size={20} />, roles: ["USER", "OWNER", "ADMIN"] },
    { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={20} />, roles: ["OWNER", "ADMIN"] },
    { name: "Users", path: "/users", icon: <Users size={20} />, roles: ["ADMIN"] },
  ];

  return (
    <Flex h="100vh">
      <Box w="250px" bg="gray.900" color="white" p={5}>
        <VStack align="stretch" gap={6}>
          <Text fontSize="2xl" fontWeight="bold" mb={4}>Roomly</Text>
          <VStack align="stretch" gap={2}>
            {navItems.filter(item => item.roles.includes(user?.role || "")).map((item) => (
              <Link 
                as={RouterLink} 
                href={item.path} 
                key={item.path}
                _hover={{ bg: "gray.700", textDecoration: "none" }}
                p={3}
                borderRadius="md"
                display="flex"
                alignItems="center"
                gap={3}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </VStack>
          <Button 
            variant="ghost" 
            colorPalette="red" 
            onClick={logout} 
            display="flex" 
            gap={3} 
            justifyContent="flex-start"
          >
            <LogOut size={20} /> Logout
          </Button>
        </VStack>
      </Box>

      {/* Main Content Area */}
      <Box flex="1" bg="gray.50" p={8} overflowY="auto">
        <Outlet />
      </Box>
    </Flex>
  );
};

export default MainLayout;