import { useGetBikesQuery } from "@/redux/feature/bike/bikeApi";
import SalesBikeCard from "./components/sales-bike-card";
import { TBike } from "@/types/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Bike_Brands, Types_of_bikes } from "@/constant";
import { getLastTenYears } from "@/libs/getLast10years";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ArrowDown from "@/assets/icons/arrowDown";

const SalesManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setminPrice] = useState("");
  const [maxPrice, setmaxPrice] = useState("");
  const [releaseYear, setReleaseYear] = useState(""); // Changed to camelCase for consistency
  const [brand, setBrand] = useState(""); // Changed to camelCase for consistency
  const [type, setType] = useState("");
  const [minCcSize, setminCcSize] = useState("");
  const [maxCcSize, setmaxCCSize] = useState("");

  const { data, isLoading, refetch } = useGetBikesQuery({
    searchTerm: searchTerm,
    minPrice,
    maxPrice,
    releaseYear,
    brand,
    minCcSize,
    maxCcSize,
    type,
  });
  const handleSubmit = () => {
    console.log(searchTerm);
    refetch();
  };

  const lastTenYears = getLastTenYears();

  return (
    <div>
      <h1 className="h3-semibold">Sales Management</h1>
      {/* Filters */}
      <div className="py-6 justify-between space-y-4  gap-x-4">
        <div className="flex gap-x-4">
          <Input
            className="max-w-[400px]"
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search by model,name,color etc"
          />
          <Button onClick={handleSubmit} variant="outline">
            Search
          </Button>
        </div>
        <div className="flex flex-wrap  gap-4">
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
            <SelectTrigger className="w-[180px] text-slate-900 font-semibold">
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
                {lastTenYears.map((year, i) => (
                  <SelectItem key={i} value={year.toString()}>
                    {year.toString()}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <hr />
      {/* Data */}
      <div className="mt-4">
        {isLoading ? (
          <>
            <p>Loading</p>
          </>
        ) : (
          <>
            {data?.data?.data?.length === 0 ? (
              <>
                <p className="text-4xl font-bold text-center py-20 text-gray-700">
                  Nothing Found
                </p>
              </>
            ) : (
              <>
                <div className="grid text-sm font-semibold border-b pb-4 mb-4 lg:grid-cols-6">
                  <div className="flex gap-2">
                    <p>#</p>
                    <p>Name</p>
                  </div>
                  <p className="text-center">Quantity</p>
                  <p>Price</p>
                  <p className="lg:block hidden">Type</p>
                  <p className="lg:block hidden">Color</p>
                  <p>Actions</p>
                </div>
                <div className="space-y-4 overflow-x-auto">
                  {data?.data?.data?.map((bike: TBike, i: number) => (
                    <SalesBikeCard key={i} i={i} data={bike} />
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

export default SalesManagement;
