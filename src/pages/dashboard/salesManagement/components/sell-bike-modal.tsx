import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TBike } from "@/types/types";
import { addNewBikeSchema } from "@/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const SellBikeModal = ({
  open,
  setOpen,
  bikeDetails,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  bikeDetails: TBike;
}) => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof addNewBikeSchema>>({
    resolver: zodResolver(addNewBikeSchema),
    defaultValues: {
      name: "",
      price: 0,
      quantity: 0,
      brand: "",
      model: "",
      type: "",
      color: "",
      releaseDate: "",
    },
  });
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof addNewBikeSchema>) {
    try {
      //   await addNewBike(values);
      setOpen(false);
      toast("SuccessFully Added");
      form.reset();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      {" "}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button onClick={() => setOpen(true)} variant="outline">
            Sell
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] overflow-y-scroll max-h-full lg:max-h-[700px] ">
          <DialogHeader>
            <DialogTitle>Add New Bike</DialogTitle>
          </DialogHeader>
          <div className="">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Type the name of Bike" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0"
                          {...field}
                          onChange={event =>
                            field.onChange(+event.target.value)
                          }
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantity</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0"
                          {...field}
                          onChange={event =>
                            field.onChange(+event.target.value)
                          }
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SellBikeModal;
