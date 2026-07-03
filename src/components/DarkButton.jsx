import React, { useState } from "react";
import { MoonIcon, SunIcon } from "@animateicons/react/lucide"

const DarkButton = () => {
    const [darkmode, setDarkmode] = useState(false)

    const toggleDark = () =>{
        setDarkmode(!darkmode)
    }

    return (
        <div className="git-btn cursor-pointer border-4 border-black bg-[#c0a9b0] pb-2.5 select-none transition-all duration-100 ease-in-out active:p-0 active:mb-2.5 active:translate-y-2.5" onClick={toggleDark}>
            <button className="cursor-pointer bg-[#7880b5] flex items-enter gap-3 border-4 border-white  p-1">
                {darkmode ? <SunIcon
                        size={24}
                        duration={1}
                        color="#ffffff"
                    />
                : <MoonIcon
                        size={24}
                        duration={1}
                        color="#ffffff"
                    />
                }

            </button>
        </div>
    )
}

export default DarkButton;