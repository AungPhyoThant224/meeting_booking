import { Button, Input, Stack } from "@chakra-ui/react";
import { 
  DialogBody, DialogCloseTrigger, DialogContent, 
  DialogFooter, DialogHeader, DialogRoot, DialogTitle, DialogTrigger 
} from "@/components/ui/dialog";
import { Field } from "@/components/ui/field";
import { useForm } from "react-hook-form";
import useCreateBooking from "../../hooks/bookings/useCreateBooking";
import { useState } from "react";

const CreateBookingModal = () => {
  const [open, setOpen] = useState(false);
  const { mutate, isPending } = useCreateBooking();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (values: any) => {
    const start = new Date(`${values.date}T${values.startTime}`).toISOString();
    const end = new Date(`${values.date}T${values.endTime}`).toISOString();

    mutate({ startTime: start, endTime: end }, {
      onSuccess: () => {
        reset();
        setOpen(false);
      }
    });
  };

  return (
    <DialogRoot open={open} onOpenChange={(e) => setOpen(e.open)}>
      <DialogTrigger asChild>
        <Button colorPalette="teal">New Booking</Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Create New Booking</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <Stack gap="4">
              <Field label="Booking Date">
                <Input type="date" {...register("date", { required: true })} />
              </Field>
              <Stack direction="row" gap="4">
                <Field label="Start Time">
                  <Input type="time" {...register("startTime", { required: true })} />
                </Field>
                <Field label="End Time">
                  <Input type="time" {...register("endTime", { required: true })} />
                </Field>
              </Stack>
            </Stack>
          </DialogBody>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" loading={isPending} colorPalette="teal">
              Confirm Booking
            </Button>
          </DialogFooter>
          <DialogCloseTrigger />
        </form>
      </DialogContent>
    </DialogRoot>
  );
};

export default CreateBookingModal;