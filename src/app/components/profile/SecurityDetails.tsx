import { Button } from "@mui/material";
import { EditIcon } from "./EditIcon";
export default function SecurityDetails() {
    return (
      <div className="p-9 w-[430px] bg-zinc-900 rounded-lg text-white" style={{border: "solid #303136 2px",borderRadius:'50px'}}>
        <div className="flex justify-between items-start">
        <h2 className="text-xl font-bold mb-4">Security</h2>
        <Button className="w-fit border-l-1" style={{borderRadius:'50%'}}><EditIcon/></Button>
        </div>
        <p className="mb-5"><span className="mr-[124px] text-[#999999]">2FA:</span>Enabled</p>
        <p className="mt-5"><span className="mr-[94px] text-[#999999]">Method:</span>SMS code</p>
      </div>
    );
  }
  