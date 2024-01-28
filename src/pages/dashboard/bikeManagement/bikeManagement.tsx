import {
  useDeleteBikeMutation,
  useGetBikesQuery,
} from "@/redux/feature/bike/bikeApi";
import AddnewBikeModal from "./_lib/components/add-new-bike-modal";
import { useState } from "react";
import BikeCard from "./_lib/components/bike-card";
import { TBike } from "@/types/types";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import LoadingAnimation from "@/components/ui/loadingAnimation";

const BikeManagement = () => {
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useGetBikesQuery(undefined);
  const [SelectedBikes, setSelectedBikes] = useState<TBike[]>([]);
  const [deleteBike] = useDeleteBikeMutation();

  const handleDelete = async () => {
    const selectedBikeIds = SelectedBikes.map(bike => bike?._id);

    try {
      console.log(selectedBikeIds);

      const payload = {
        deletedIds: selectedBikeIds,
      };

      const res = await deleteBike(payload);
      console.log(res);
      toast.success("Deleted");
    } catch (err) {
      toast.success("Some Thing Went Wrong");
      console.log(err);
    }
  };

  const bikes = data?.data?.data;
  return (
    <div className="">
      <h1 className="h3-semibold">Bike Management</h1>

      <div className="py-4 justify-between items-center flex ">
        <AddnewBikeModal setOpen={setOpen} open={open} />
        <Button
          onClick={handleDelete}
          disabled={SelectedBikes.length === 0}
          variant="secondary"
        >
          Delete
        </Button>
      </div>
      <div className="border-t pt-6">
        {isLoading ? (
          <>
            <LoadingAnimation />
          </>
        ) : (
          <>
            {bikes?.length === 0 ? (
              <>
                <p className="text-4xl font-bold text-center py-20 text-gray-700">
                  Empty Inventory
                </p>
              </>
            ) : (
              <>
                <div className="space-y-4">
                  {bikes?.map((bike: TBike, i: number) => (
                    <BikeCard
                      SelectedBikes={SelectedBikes}
                      setSelectedBikes={setSelectedBikes}
                      key={i}
                      data={bike}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BikeManagement;
