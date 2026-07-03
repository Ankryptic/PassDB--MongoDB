import React from "react";
import { CheckIcon } from "@animateicons/react/lucide";

{/* <CheckIcon
  size={64}
  duration={1}
  color="#ffffff"
/> */}

const SaveBtn = () => {
    return (
        <div className="git-btn cursor-pointer border-2 border-black bg-[#c0a9b0] pb-1 select-none transition-all duration-100 ease-in-out active:p-0 active:mb-1 active:translate-y-1">
            <button className="cursor-pointer bg-[#7880b5] text-[#bcc4db] text-shadow-[2px_1px_5px_black] flex items-enter gap-3 border border-white font-bold  p-1 py-0">
                <span>Save</span>
            </button>
        </div>
    )
}

export default SaveBtn;