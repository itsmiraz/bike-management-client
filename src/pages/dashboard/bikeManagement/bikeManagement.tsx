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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ArrowDown from "@/assets/icons/arrowDown";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Bike_Brands, Colors, Types_of_bikes } from "@/constant";
import { getLastTenYears } from "@/libs/getLast10years";

const BikeManagement = () => {
  const [open, setOpen] = useState(false);
  const [minPrice, setminPrice] = useState("");
  const [maxPrice, setmaxPrice] = useState("");
  const [releaseYear, setReleaseYear] = useState(""); // Changed to camelCase for consistency
  const [brand, setBrand] = useState(""); // Changed to camelCase for consistency
  const [type, setType] = useState("");
  const [minCcSize, setminCcSize] = useState("");
  const [maxCcSize, setmaxCCSize] = useState("");
  const [color, setcolor] = useState("");

  const { data, isLoading } = useGetBikesQuery({
    color,
    minPrice,
    maxPrice,
    releaseYear,
    brand,
    minCcSize,
    maxCcSize,
    type,
  });

  const [SelectedBikes, setSelectedBikes] = useState<TBike[]>([]);
  const [deleteBike] = useDeleteBikeMutation();

  const handleDelete = async () => {
    const selectedBikeIds = SelectedBikes.map(bike => bike?._id);

    try {
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

      <div>
        <p className="mb-2 font-medium">Filter</p>
        <div className="flex flex-wrap mb-4  gap-4">
          <div className="flex gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button className="flex items-center" variant="outline">
                  Price Range <ArrowDown />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Price Range</h4>
                  </div>
                  <div className="grid gap-2">
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="maxWidth">Min Price </Label>
                      <Input
                        onChange={e => setminPrice(e.target.value)}
                        className="max-w-[180px]"
                        placeholder="Min Price"
                      />
                    </div>

                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="maxHeight">Max Price </Label>
                      <Input
                        onChange={e => setmaxPrice(e.target.value)}
                        className="max-w-[180px]"
                        placeholder="Max Price"
                      />
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <Select onValueChange={setBrand}>
            <SelectTrigger className="max-w-[180px] text-slate-900 font-semibold">
              <SelectValue placeholder="Select a brand" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Brands</SelectLabel>
                <SelectItem value="-">All Brands</SelectItem>

                {Bike_Brands.map((brand, i) => (
                  <SelectItem key={i} value={brand}>
                    {brand}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select onValueChange={setcolor}>
            <SelectTrigger className="max-w-[180px] text-slate-900 font-semibold">
              <SelectValue placeholder="Select a Color" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Colors</SelectLabel>
                <SelectItem value="-">All Colors</SelectItem>

                {Colors.map((color, i) => (
                  <SelectItem key={i} value={color}>
                    {color}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select onValueChange={setType}>
            <SelectTrigger className="text-slate-900 font-semibold w-[180px]">
              <SelectValue className="" placeholder="Select a type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Type</SelectLabel>
                <SelectItem value="-">All Types</SelectItem>
                {Types_of_bikes.map((type, i) => (
                  <SelectItem key={i} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Popover>
            <PopoverTrigger asChild>
              <Button className="flex items-center" variant="outline">
                Engine Size <ArrowDown />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Engine CC Limit</h4>
                </div>
                <div className="grid gap-2">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="maxWidth">Max. </Label>
                    <Input
                      type="number"
                      onChange={e => setmaxCCSize(e.target.value)}
                      defaultValue={maxCcSize}
                      className="col-span-2 h-8"
                    />
                  </div>

                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="maxHeight">Min. </Label>
                    <Input
                      onChange={e => setminCcSize(e.target.value)}
                      defaultValue={minCcSize}
                      className="col-span-2 h-8"
                    />
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <Select onValueChange={setReleaseYear}>
            <SelectTrigger className="w-[180px] text-slate-900 font-semibold">
              <SelectValue placeholder="Select a Realase Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Year</SelectLabel>
                <SelectItem value="-">All Year</SelectItem>
                {getLastTenYears().map((year, i) => (
                  <SelectItem key={i} value={year.toString()}>
                    {year.toString()}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
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
                      setAddNewBikeModal={setOpen}
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
