import { TBike } from "@/types/types";
import { useState } from "react";
import SellBikeModal from "./sell-bike-modal";
import { Button } from "@/components/ui/button";

const SalesBikeCard = ({ data, i }: { data: TBike; i: number }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex base-normal items-center justify-between border-b pb-4 ">
      <div className="flex justify-center items-center gap-x-4">
        <p>{i + 1} .</p>

        <p>{data?.name}</p>
      </div>
      <p>{data.quantity}</p>
      <p>{data.price} Tk</p>
      <p>{data.type} </p>
      <p>{data.color} </p>
      <div className="flex gap-x-4">
        <SellBikeModal bikeDetails={data} open={open} setOpen={setOpen} />
        <Button>Details</Button>
      </div>
    </div>
  );
};

export default SalesBikeCard;
