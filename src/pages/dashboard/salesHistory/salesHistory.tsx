import LoadingAnimation from "@/components/ui/loadingAnimation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TimelineType } from "@/constant";
import { useGetHistoryQuery } from "@/redux/feature/sale/saleApi";
import { useState } from "react";
import SalesHistoryCard from "./components/sales-history-card";
import { TSaleCard } from "@/types/types";

const SalesHistory = () => {
  const [timeline, settimeLine] = useState<string>("daily");
  const { data, isLoading } = useGetHistoryQuery({ timeline });
  console.log(data);
  return (
    <div>
      <h1 className="h3-semibold">Sales History</h1>

      <div className="py-4">
        <Select onValueChange={settimeLine}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Time line</SelectLabel>
              {TimelineType.map(type => (
                <SelectItem value={type.value}>{type.label}</SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <hr className="pb-4" />
      <div>
        {isLoading ? (
          <>
            <LoadingAnimation />
          </>
        ) : (
          <>
            {data?.data?.length === 0 ? (
              <>
                <p>Empty History</p>
              </>
            ) : (
              <>
                {data?.data?.map((history: TSaleCard, i: number) => (
                  <SalesHistoryCard i={i} key={i} data={history} />
                ))}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SalesHistory;
