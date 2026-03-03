import { Button, Input, Stack } from "@chakra-ui/react";
import { 
  DialogBody, DialogContent, DialogFooter, 
  DialogHeader, DialogRoot, DialogTitle, DialogTrigger 
} from "@/components/ui/dialog";
import { Field } from "@/components/ui/field";
import { NativeSelectField, NativeSelectRoot } from "@/components/ui/native-select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserSchema, type CreateUserFormData } from "../../validations/userSchema";
import useCreateUser from "../../hooks/users/useCreateUser";
import { useState } from "react";

const CreateUserModal = () => {
  const [open, setOpen] = useState(false);
  const { mutate, isPending } = useCreateUser();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      role: "USER" // Default value
    }
  });

  const onSubmit = (data: CreateUserFormData) => {
    mutate(data, {
      onSuccess: () => {
        reset();
        setOpen(false);
      },
    });
  };

  return (
    <DialogRoot open={open} onOpenChange={(e) => setOpen(e.open)}>
      <DialogTrigger asChild>
        <Button colorPalette="blue">Add User</Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Create New User</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <Stack gap="4">
              <Field label="Full Name" invalid={!!errors.name} errorText={errors.name?.message}>
                <Input {...register("name")} placeholder="John Doe" />
              </Field>

              <Field label="Email" invalid={!!errors.email} errorText={errors.email?.message}>
                <Input type="email" {...register("email")} placeholder="john@example.com" />
              </Field>

              <Field label="Password" invalid={!!errors.password} errorText={errors.password?.message}>
                <Input type="password" {...register("password")} placeholder="******" />
              </Field>

              {/* NEW ROLE FIELD */}
              <Field label="Role" invalid={!!errors.role} errorText={errors.role?.message}>
                <NativeSelectRoot>
                  <NativeSelectField {...register("role")}>
                    <option value="USER">USER</option>
                    <option value="OWNER">OWNER</option>
                    <option value="ADMIN">ADMIN</option>
                  </NativeSelectField>
                </NativeSelectRoot>
              </Field>
            </Stack>
          </DialogBody>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" loading={isPending} colorPalette="blue">Create User</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </DialogRoot>
  );
};

export default CreateUserModal;