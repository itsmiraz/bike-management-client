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
import {
  useAddNewBikeMutation,
  useUpdateBikeMutation,
} from "@/redux/feature/bike/bikeApi";
import { TBike } from "@/types/types";
import { addNewBikeSchema } from "@/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
const UpdateBikeModal = ({
  open,
  setOpen,
  defaultData,
}: {
  defaultData: TBike;
}) => {
  const [updateBike] = useUpdateBikeMutation();

  // 1. Define your form.
  const form = useForm<z.infer<typeof addNewBikeSchema>>({
    resolver: zodResolver(addNewBikeSchema),
    defaultValues: {
      name: defaultData.name,
      price: defaultData.price,
      quantity: defaultData.quantity,
      brand: defaultData.brand,
      model: defaultData.model,
      type: defaultData.type,
      color: defaultData.color,
      releaseDate: defaultData.releaseDate,
    },
  });
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof addNewBikeSchema>) {
    try {
      const payload = {
        id: defaultData._id,
        data: values,
      };

      await updateBike(payload);
      setOpen(false);
      toast("SuccessFully Updated");
      form.reset();
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className=" ">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button onClick={() => setOpen(true)} variant="outline">
            Update
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] overflow-y-scroll max-h-full lg:max-h-[700px] ">
          <DialogHeader>
            <DialogTitle>Update Bike Details</DialogTitle>
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
                <FormField
                  control={form.control}
                  name="brand"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Brand</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Type the brand of Bike"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="model"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Model</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Type the model of Bike"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="color"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Color</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="releaseDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Release Date</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
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

export default UpdateBikeModal;