import { TSaleCard } from "@/types/types";
import ShowDetailsAbout from "../../bikeManagement/_lib/components/showDetails";

const SalesHistoryCard = ({ data, i }: { data: TSaleCard; i: number }) => {
  const date = new Date(data?.date);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const dateString = `${day}/${month}/${year}`;
  return (
    <div className="flex  base-normal items-center justify-between border-b py-4">
      <div className="flex gap-2">
        <p>{i + 1} .</p>
        <p>{data?.buyerName}</p>
      </div>
      <p className="md:block hidden">{data?.productId?.name}</p>
      <p>{data?.quantity}</p>
      <p>{dateString}</p>
      <ShowDetailsAbout data={data?.productId} />
    </div>
  );
};

export default SalesHistoryCard;
