import React from "react";
import { GithubIcon } from "@animateicons/react/lucide";


const GithubButton = () => {
    return (
        <div className="git-btn cursor-pointer border-4 border-black bg-[#c0a9b0] pb-2.5 select-none transition-all duration-100 ease-in-out active:p-0 active:mb-2.5 active:translate-y-2.5">
            <button className="cursor-pointer bg-[#7880b5] flex items-enter gap-3 border-4 border-white  p-1">
                <GithubIcon
                    size={24}
                    duration={1}
                    color="#ffffff"
                />
                <span>GitHub</span>
            </button>
        </div>
    )
}

export default GithubButton;