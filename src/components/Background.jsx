import React from "react";

const Background = () => {
    return (
        <>
            {/* <div className="fixed inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-size-[6rem_4rem]"><div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#6bbae6,transparent)]"></div></div> */}

            <div className="fixed -z-10 h-full w-full bg-[#7880b5] dark:bg-[#253142]"><div className="absolute inset-0 bg-[#6bbaec] ] bg-size-[20px_20px] opacity-20 blur-[100px]"></div></div>
        </>
    )
}

export default Background;