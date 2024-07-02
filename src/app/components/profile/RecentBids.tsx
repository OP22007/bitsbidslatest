import { Button } from "@nextui-org/react";
import { EditIcon } from "./EditIcon";
import { UploadIcon } from "./UploadIcon";
import Link from "next/link";
export default function RecentBids() {
  return (
    <div className="h-1/5 mb-24">
        <div className="text-container relative z-10 top-20 ml-[10px] font-extrabold text-md">
        <Link className="flex flex-col gap-4 items-start" href='/yourbids'>
        <UploadIcon/>
        See previous bids
        </Link>
        </div>
      <div className="gradient-bg rounded-3xl text-white z-0 mb-20" style={{width:'200px',height:'120px'}}>
        <svg xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="goo">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="10"
                result="blur"
              />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
                result="goo"
              />
              <feBlend in="SourceGraphic" in2="goo" />
            </filter>
          </defs>
        </svg>
        <div className="gradients-container">
          <div className="g1"></div>
          <div className="g2"></div>
          <div className="g3"></div>
          <div className="g4"></div>
          <div className="g5"></div>
          <div className="interactive"></div>
        </div>
      </div>
      </div>
    //   <div
    //     className="gradients-bg p-2 w-[230px] h-1/4 bg-zinc-900 rounded-lg text-white"
    //     style={{ border: "solid #303136 2px", borderRadius: "50px" }}
    //   >
    //     <Button
    //       className="w-fit bg-transparent"
    //       style={{ borderRadius: "50%" }}
    //       isIconOnly
    //     >
    //       <UploadIcon />
    //     </Button>
    //   </div>
    // </div>
  );
}
