import { useGetBikesQuery } from "@/redux/feature/bike/bikeApi";
import SalesBikeCard from "./components/sales-bike-card";
import { TBike } from "@/types/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SalesManagement = () => {
  const { data, isLoading } = useGetBikesQuery(undefined);

  return (
    <div>
      <h1 className="h3-semibold">Sales Management</h1>
      <div className="py-6 flex gap-x-4">
        <Input className="max-w-[400px]" placeholder="Search Here" />
        <Button variant="outline">Search</Button>
      </div>
      <hr />
      <div className="mt-6">
        {isLoading ? (
          <>
            <p>Loading</p>
          </>
        ) : (
          <div className="space-y-4">
            {data?.data?.map((bike: TBike, i: number) => (
              <SalesBikeCard key={i} i={i} data={bike} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesManagement;
