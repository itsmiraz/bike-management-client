import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useCreateSaleMutation } from "@/redux/feature/sale/saleApi";
import { TBike } from "@/types/types";
import { SaleSchema } from "@/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
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
  const [createSale] = useCreateSaleMutation();

  // 1. Define your form.
  const form = useForm<z.infer<typeof SaleSchema>>({
    resolver: zodResolver(SaleSchema),
    defaultValues: {
      buyerName: "",
      quantity: 0,
    },
  });
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SaleSchema>) {
    try {
      //   await addNewBike(values);

      const payload = {
        ...values,
        productId: bikeDetails._id,
      };
      console.log(payload);
      await createSale(payload);
      setOpen(false);
      toast("SuccessFully Sold");
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
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Quantity To be Sold{" "}
                        <span className="text-sm">
                          ({bikeDetails.quantity} left)
                        </span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0"
                          max={bikeDetails.quantity}
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
                  name="buyerName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name of Buyer</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date of birth</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={date =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>

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
