import { Box, Flex, VStack, Text, Button, HStack, Spacer, chakra } from "@chakra-ui/react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { LayoutDashboard, Calendar, Users, LogOut, UserCircle } from "lucide-react";

const StyledNavLink = chakra(NavLink, {
  base: {
    p: "3",
    borderRadius: "lg",
    display: "flex",
    alignItems: "center",
    gap: "3",
    color: "gray.600",
    fontWeight: "medium",
    transition: "all 0.2s",
    _hover: { 
      bg: "teal.50", 
      color: "teal.700", 
      textDecoration: "none" 
    },
    "&.active": {
      bg: "teal.100",
      color: "teal.800",
    },
  },
});

const MainLayout = () => {
  const { user, logout } = useAuthStore();

  const navItems = [
    { name: "Bookings", path: "/bookings", icon: <Calendar size={20} />, roles: ["USER", "OWNER", "ADMIN"] },
    { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={20} />, roles: ["OWNER", "ADMIN"] },
    { name: "Users", path: "/users", icon: <Users size={20} />, roles: ["ADMIN"] },
  ];

  return (
    <Flex h="100vh" overflow="hidden">
      <Box 
        w="260px" 
        bg="white" 
        borderRight="1px solid" 
        borderColor="gray.200" 
        p={5} 
        display="flex" 
        flexDirection="column"
      >
        <Text fontSize="2xl" color="teal.600" fontWeight="bold" mb={10} px={3}>
          Booking
        </Text>
        
        <VStack align="stretch" gap={1}>
          {navItems
            .filter(item => item.roles.includes(user?.role || ""))
            .map((item) => (
              <StyledNavLink to={item.path} key={item.path}>
                {item.icon}
                {item.name}
              </StyledNavLink>
            ))}
        </VStack>

        <Spacer />
        
        <Button 
          variant="ghost" 
          colorPalette="red" 
          onClick={logout} 
          justifyContent="flex-start" 
          gap={3} 
          mb={2}
        >
          <LogOut size={20} /> Logout
        </Button>
      </Box>

      <Flex flex="1" flexDirection="column" bg="gray.50">
        <Box bg="white" px={8} py={4} borderBottom="1px solid" borderColor="gray.200">
          <HStack>
            <Spacer />
            <HStack gap={4} px={4} py={1} borderRadius="full" bg="gray.100">
              <VStack align="flex-end" gap={0}>
                <Text fontSize="sm" fontWeight="bold" lineHeight="1">{user?.name}</Text>
                <Text fontSize="xs" color="teal.600" fontWeight="semibold">{user?.role}</Text>
              </VStack>
              <UserCircle size={32} color="gray" />
            </HStack>
          </HStack>
        </Box>

        <Box p={8} overflowY="auto" flex="1">
          <Outlet />
        </Box>
      </Flex>
    </Flex>
  );
};

export default MainLayout;