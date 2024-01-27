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

const SalesManagement = () => {
  const { data, isLoading } = useGetBikesQuery(undefined);

  return (
    <div>
      <h1 className="h3-semibold">Sales Management</h1>
      <div className="py-6 justify-between flex gap-x-4">
        <div className="flex gap-4">
          <Button variant="outline">Filter</Button>

          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a brand" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Brands</SelectLabel>
                <SelectItem value="a">All Brands</SelectItem>
                {Bike_Brands.map((brand, i) => (
                  <SelectItem key={i} value={brand}>
                    {brand}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Type</SelectLabel>
                <SelectItem value="a">All Types</SelectItem>
                {Types_of_bikes.map((type, i) => (
                  <SelectItem key={i} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-x-4">
          <Input className="max-w-[400px]" placeholder="Search Here" />
          <Button variant="outline">Search</Button>
        </div>
      </div>
      <hr />
      <div className="mt-6">
        {isLoading ? (
          <>
            <p>Loading</p>
          </>
        ) : (
          <div className="space-y-4">
            {data?.data?.data?.map((bike: TBike, i: number) => (
              <SalesBikeCard key={i} i={i} data={bike} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesManagement;
