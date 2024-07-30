import Image from "next/image";
import { FollowerPointerCard } from "./ui/following-pointer";

export function FollowingPointerDemo({imgurl,title,date}) {
  console.log(imgurl)
  return (
    <div className="w-80 mx-auto">
      <FollowerPointerCard>
        <div className="relative overflow-hidden h-full rounded-2xl transition duration-200 group bg-transparent hover:shadow-xl border border-zinc-100">
          <div className="w-full aspect-w-16 aspect-h-10 bg-black rounded-tr-lg rounded-tl-lg overflow-hidden xl:aspect-w-16 xl:aspect-h-10 relative">
            <img
              src={imgurl}
              alt="thumbnail"
              layout="fill"
              objectFit="cover"
              className={`group-hover:scale-95 group-hover:rounded-2xl transform object-cover transition duration-200 `}
            />
          </div>
          <div className=" p-4">
            <h2 className="font-bold my-4 text-lg text-white">
              {title}
            </h2>
            <div className="flex flex-row justify-between items-center mt-10">
              <span className="text-sm text-white">{blogContent.date}</span>
              <div className="relative z-10 px-6 py-2 bg-gray-100 text-black font-bold rounded-xl block text-xs">
                More Details
              </div>
            </div>
          </div>
        </div>
      </FollowerPointerCard>
    </div>
  );
}

const blogContent = {
  slug: "amazing-tailwindcss-grid-layouts",
  author: "Manu Arora",
  date: "28th March, 2023",
  title: "Amazing Tailwindcss Grid Layout Examples",
  description:
    "Grids are cool, but Tailwindcss grids are cooler. In this article, we will learn how to create amazing Grid layouts with Tailwindcs grid and React.",
  image: "/demo/thumbnail.png",
  authorAvatar: "/manu.png",
};

// const TitleComponent = ({
//   title,
//   avatar,
// }: {
//   title: string;
//   avatar: string;
// }) => (

// );
