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

const SalesManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setminPrice] = useState("");
  const [maxPrice, setmaxPrice] = useState("");
  const [releaseYear, setReleaseYear] = useState(""); // Changed to camelCase for consistency
  const [brand, setBrand] = useState(""); // Changed to camelCase for consistency
  const [type, setType] = useState("");
  const { data, isLoading, refetch } = useGetBikesQuery({
    searchTerm: searchTerm,
    minPrice,
    maxPrice,
    releaseYear,
    brand,
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
            <Input
              onChange={e => setminPrice(e.target.value)}
              className="max-w-[180px]"
              placeholder="Min Price"
            />
            <Input
              onChange={e => setmaxPrice(e.target.value)}
              className="max-w-[180px]"
              placeholder="Max Price"
            />
          </div>

          <Select onValueChange={setBrand}>
            <SelectTrigger className="w-[180px]">
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
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a type" />
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
          <Select onValueChange={setReleaseYear}>
            <SelectTrigger className="w-[180px]">
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
