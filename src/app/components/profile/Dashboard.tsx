"use client";

import Header from "./Header";
import ProfileDetails from "./ProfileDetails";
import OverviewCard from "./OverviewCard";
import LatestActivity from "./LatestActivity";
import SecurityDetails from "./SecurityDetails";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Upload from './Upload'
import RecentBids from "./RecentBids";
export default function Dashboard() {
  const session = useSession();
  const userEmail = session.data?.user?.email;
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/getusers?email=${userEmail}`
      );
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (userEmail) {
      getUser();
    }
  }, [userEmail]);
  return (
    <div className="bg-zinc-900 h-fit text-gray-300">
      <Header user={user} />
      <div className="p-6">
        <div className="flex flex-wrap h-fit gap-6 ml-10">
          <div className="flex gap-6">
            <div className="flex flex-col h-[550px] items-center justify-between">
              <ProfileDetails user={user} />
              <SecurityDetails />
            </div>
            <div className="flex flex-col h-[550px]">
            <OverviewCard />
            <div className="flex gap-6 h-[100px]">
            <Upload/>
            <RecentBids/>
            </div>
            </div>
          </div>
          <LatestActivity user={user} />
        </div>
        <div></div>
      </div>
    </div>
  );
}
