import React, { useEffect } from 'react'
import gsap from 'gsap';
function Loading() {
    useEffect(() => {
        // GSAP animation for the loader
        // const timeline = gsap.timeline({ repeat: -1, repeatDelay: 1 });
        const timeline = gsap.timeline({  repeatDelay: 1,repeat:-1 });
        // timeline.from('.loader-dot', {
        //   opacity: 1,
        //   scale: 2,
        //   stagger: 0.5,
        //   duration: 0.4,
        //   yoyo: true,
        // });
        timeline.to('.line', {
            scaleY: 3,
            stagger: .5,
            duration: .5,
            yoyo: true,
            // repeat: -1,
            opacity: 1,
        })

    }, []);

    return (
        <div className="flex justify-center items-center w-full h-[8vh]">
            <div className="flex space-x-[10px]">
                {/* <div className="w-4 h-4 bg-red-500 rounded-full loader-dot"></div>
            <div className="w-4 h-4 bg-yellow-500 rounded-full loader-dot"></div>
            <div className="w-4 h-4 bg-green-500 rounded-full loader-dot"></div> */}

                <div className='w-3 h-5 bg-[#00000095] line'></div>
                <div className='w-3 h-5 bg-[#00000095] line'></div>
                <div className='w-3 h-5 bg-[#00000095] line'></div>
            </div>
        </div>
    );
}

export default Loading