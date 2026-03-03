import { 
  Box, 
  Button, 
  Heading, 
  VStack, 
  Container, 
  Text,
  Input,
  Field
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "../validations/authSchema";
import useLogin from "../hooks/auth/useLogin";

const LoginPage = () => {
  const { mutate, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    mutate(data);
  };

  return (
    <Container maxW="md" centerContent py={20}>
      <Box 
        p={8} 
        borderWidth={1} 
        borderRadius="lg" 
        boxShadow="lg" 
        width="100%" 
        bg="white"
      >
        <VStack gap={6} align="stretch">
          <Heading size="xl" textAlign="center">Login</Heading>
          <Text color="gray.600" textAlign="center">
            Enter your credentials to Login.
          </Text>

          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack gap={4}>
              <Field.Root invalid={!!errors.email}>
                <Field.Label>Email</Field.Label>
                <Input 
                  {...register("email")} 
                  placeholder="admin@example.com" 
                  type="email" 
                />
                <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
              </Field.Root>

              <Field.Root invalid={!!errors.password}>
                <Field.Label>Password</Field.Label>
                <Input 
                  {...register("password")} 
                  type="password" 
                  placeholder="••••••" 
                />
                <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
              </Field.Root>

              <Button 
                type="submit" 
                colorPalette="teal" 
                width="full" 
                loading={isPending}
              >
                Sign In
              </Button>
            </VStack>
          </form>
        </VStack>
      </Box>
    </Container>
  );
};

export default LoginPage;