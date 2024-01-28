import { TBike } from "@/types/types";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Ellipsis from "@/assets/icons/ellipsis";
import UpdateBikeModal from "./update-bike-details-modal";
import { useState } from "react";

const BikeCard = ({
  data,
  setSelectedBikes,
  SelectedBikes,
}: {
  data: TBike;
  SelectedBikes: TBike[];
  setSelectedBikes: React.Dispatch<React.SetStateAction<never[] | TBike[]>>;
}) => {
  const [open, setopen] = useState(false);

  const handleSelect = (selectedBike: TBike) => {
    const isExits = SelectedBikes.find(bike => bike._id === selectedBike._id);
    // console.log(isExits);
    if (isExits) {
      const filteredBikes = SelectedBikes.filter(
        bike => bike._id !== selectedBike._id
      );
      setSelectedBikes(filteredBikes);
    } else {
      setSelectedBikes([...SelectedBikes, selectedBike]);
    }
  };

  return (
    <div className="flex base-normal justify-between border-b pb-4 ">
      <div className="flex justify-center items-center gap-x-4">
        <Checkbox onClick={() => handleSelect(data)} />
        <p>{data?.name}</p>
      </div>
      <p>{data.quantity}</p>
      <p>{data.price} Tk</p>
      <p className="md:block hidden">{data.type} </p>
      <p className="md:block hidden">{data.color} </p>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <Ellipsis />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>
            <UpdateBikeModal defaultData={data} open={open} setOpen={setopen} />
          </DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default BikeCard;
