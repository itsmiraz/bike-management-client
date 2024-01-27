import { Button } from "@/components/ui/button";
import { TBike } from "@/types/types";

const SalesBikeCard = ({ data, i }: { data: TBike; i: number }) => {
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
      <Button>Sell</Button>
    </div>
  );
};

export default SalesBikeCard;
