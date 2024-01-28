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
import CreateVarient from "./createVarientModal";
import ShowDetailsAbout from "./showDetails";

const BikeCard = ({
  data,
  setSelectedBikes,
  SelectedBikes,
}: {
  data: TBike;
  setAddNewBikeModal: React.Dispatch<React.SetStateAction<boolean>>;
  SelectedBikes: TBike[];
  setSelectedBikes: React.Dispatch<React.SetStateAction<never[] | TBike[]>>;
}) => {
  const [open, setopen] = useState(false);
  const [createVarientModal, setcreateVarientModal] = useState(false);

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
    <div className="grid grid-cols-2 lg:grid-cols-6 base-normal justify-between border-b pb-4 ">
      <div className="flex justify-start items-center gap-x-4">
        <Checkbox onClick={() => handleSelect(data)} />
        <p>{data?.name}</p>
      </div>
      <p className="text-center md:block hidden">{data.quantity}</p>
      <p className="md:block hidden">{data.price} Tk</p>
      <p className="md:block hidden">{data.type} </p>
      <p className="md:block hidden">{data.color} </p>
      <div className="flex gap-x-4  justify-end">
        <CreateVarient
          open={createVarientModal}
          setOpen={setcreateVarientModal}
          defaultData={data}
        />
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Ellipsis />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>
              <UpdateBikeModal
                defaultData={data}
                open={open}
                setOpen={setopen}
              />
            </DropdownMenuLabel>
            <DropdownMenuLabel>
              <ShowDetailsAbout data={data} />
            </DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default BikeCard;
