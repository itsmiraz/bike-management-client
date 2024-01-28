import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TBike } from "@/types/types";

const ShowDetailsAbout = ({ data }: { data: TBike }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Details</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[325px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Details</DialogTitle>
        </DialogHeader>
        <div className=" text-sm font-medium">
          <div>
            <p>Name : {data.name}</p>
          </div>
          <div>
            <p>Brand : {data.brand}</p>
          </div>
          <div>
            <p>Model : {data.model}</p>
          </div>
          <div>
            <p>Price : {data.price} TK</p>
          </div>
          <div>
            <p>Quantity : {data.quantity}</p>
          </div>
          <div>
            <p>Color : {data.color}</p>
          </div>
          <div>
            <p>Release Date : {data.releaseDate}</p>
          </div>
        </div>
        <DialogClose>
          <Button className="flex justify-end" type="submit">
            Close
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default ShowDetailsAbout;
