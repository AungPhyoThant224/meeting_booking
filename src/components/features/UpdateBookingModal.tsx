import { Button, Input, Stack, IconButton } from "@chakra-ui/react";
import { 
  DialogBody, DialogCloseTrigger, DialogContent, 
  DialogFooter, DialogHeader, DialogRoot, DialogTitle, DialogTrigger 
} from "@/components/ui/dialog";
import { Field } from "@/components/ui/field";
import { useForm } from "react-hook-form";
import { FilePenLine } from "lucide-react";
import { useState } from "react";
import { type Booking } from "../../entities/Booking";
import useUpdateBooking from "../../hooks/bookings/useUpdateBooking";
import { getLocalData } from "@/utils/dateHelper";

interface Props {
  booking: Booking;
}

const UpdateBookingModal = ({ booking }: Props) => {
  const [open, setOpen] = useState(false);
  const { mutate, isPending } = useUpdateBooking();

  const local = getLocalData(booking.startTime);
  const localEnd = getLocalData(booking.endTime);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      date: local.date,
      startTime: local.time,
      endTime: localEnd.time,
    }
  });

  const onSubmit = (values: any) => {
    const start = new Date(`${values.date}T${values.startTime}`).toISOString();
    const end = new Date(`${values.date}T${values.endTime}`).toISOString();

    mutate({ id: booking.id, data: { startTime: start, endTime: end } }, {
      onSuccess: () => setOpen(false)
    });
  };

  return (
    <DialogRoot open={open} onOpenChange={(e) => setOpen(e.open)}>
      <DialogTrigger asChild>
        <IconButton variant="ghost" colorPalette="blue">
          <FilePenLine size={16} />
        </IconButton>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader><DialogTitle>Edit Booking</DialogTitle></DialogHeader>
          <DialogBody>
            <Stack gap="4">
              <Field label="Date">
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
            <Button type="submit" loading={isPending} colorPalette="blue">Update</Button>
          </DialogFooter>
          <DialogCloseTrigger />
        </form>
      </DialogContent>
    </DialogRoot>
  );
};

export default UpdateBookingModal;