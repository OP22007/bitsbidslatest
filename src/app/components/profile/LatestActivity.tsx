import { Divider } from "@nextui-org/react";
import { BidIcon } from "./BidIcon";

interface Bid {
  bidID: string;
  productID: string;
  price: number;
  time: Date;
}

interface User {
  userId: string;
  name: string;
  age: number;
  phone: number;
  email: string;
  bids: Bid[];
  createdAt: Date;
}

interface HeaderProps {
  user: User | null;
}

const timeDifference = (bidTime: Date) => {
  const now = new Date();
  const diffMs = now.getTime() - new Date(bidTime).getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffHours < 24) {
    return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
  } else {
    return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
  }
};

export default function LatestActivity({ user }: HeaderProps) {
  return (
    <div className="p-10 h-[550px] w-[530px] bg-opacity-60 bg-zinc-800 rounded-lg text-white overflow-y-scroll" style={{ borderRadius: '50px' }}>
      <h2 className="text-xl font-bold mb-4">Latest Activity</h2>
      <ul>
        {user&&user.bids ? (
          user.bids.map((bid) => (
            <div key={bid.bidID}>
              <li className="flex gap-3 items-center">
                <BidIcon />You created a new bid on <span className="text-yellow-400">{bid.productID}</span>
              </li>
              <div className="flex my-1">
                <Divider orientation="vertical" className="h-8 ml-4" />
                <li className="ml-[26px] text-gray-300 text-sm">{timeDifference(bid.time)}</li>
              </div>
            </div>
          ))
        ) : (
          <li className="text-gray-300">Loading user activity...</li>
        )}
      </ul>
    </div>
  );
}
