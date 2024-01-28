import { TBike } from "@/types/types";
import { useState } from "react";
import SellBikeModal from "./sell-bike-modal";
import ShowDetailsAbout from "../../bikeManagement/_lib/components/showDetails";

const SalesBikeCard = ({ data, i }: { data: TBike; i: number }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="grid grid-cols-4 lg:grid-cols-6 base-normal items-center justify-between border-b pb-4 ">
      <div className="flex  justify-start items-center gap-x-4">
        <p>{i + 1} .</p>

        <p>{data?.name}</p>
      </div>
      <p className="text-center">{data.quantity}</p>
      <p>{data.price} Tk</p>
      <p className="lg:block hidden">{data.type} </p>
      <p className="lg:block hidden">{data.color} </p>
      <div className="flex gap-x-4">
        <SellBikeModal bikeDetails={data} open={open} setOpen={setOpen} />
        <ShowDetailsAbout data={data} />
      </div>
    </div>
  );
};

export default SalesBikeCard;
