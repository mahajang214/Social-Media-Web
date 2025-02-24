import { motion } from "motion/react";
import React from "react";
// import Home from "../assets/Home-256.webp";
function YBar() {
  const boxVariants = {
    i: { x: 0, y: 50, scale: 1 },
    s: { x: 0, y: 0, scale: 1, transition: { duration: 0.7 } },
  };
  return (
    <nav className="w-full py-1 rounded-t-lg text-2xl bg-[#ffffff21] ">
      <ul className="flex justify-around items-center w-full h-full">
        <motion.li
          initial={boxVariants.i}
          animate={boxVariants.s}
          className="px-3 py-2 border-white border-[1px] rounded-xl "
        >
          <svg
            width="30px"
            height="30px"
            viewBox="0 0 20 17"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            {/* <!-- Generator: Sketch 52.5 (67469) - http://www.bohemiancoding.com/sketch --> */}
            <title>Home</title>
            <desc>Created with Sketch.</desc>
            <g
              id="Icons"
              stroke="none"
              strokeWidth="1"
              fill="none"
              fillRule="evenodd"
            >
              <g id="Rounded" transform="translate(-816.000000, -289.000000)">
                <g id="Action" transform="translate(100.000000, 100.000000)">
                  <g
                    id="-Round-/-Action-/-home"
                    transform="translate(714.000000, 186.000000)"
                  >
                    <g transform="translate(0.000000, 0.000000)">
                      <polygon id="Path" points="0 0 24 0 24 24 0 24"></polygon>
                      <path
                        d="M10,19 L10,14 L14,14 L14,19 C14,19.55 14.45,20 15,20 L18,20 C18.55,20 19,19.55 19,19 L19,12 L20.7,12 C21.16,12 21.38,11.43 21.03,11.13 L12.67,3.6 C12.29,3.26 11.71,3.26 11.33,3.6 L2.97,11.13 C2.63,11.43 2.84,12 3.3,12 L5,12 L5,19 C5,19.55 5.45,20 6,20 L9,20 C9.55,20 10,19.55 10,19 Z"
                        id="🔹Icon-Color"
                        fill="#fff"
                      ></path>
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </svg>
        </motion.li>

        <motion.li
          initial={boxVariants.i}
          animate={boxVariants.s}
          className="px-3 py-2 border-white border-[1px] rounded-xl "
        >
            {/* <!-- Generator: Sketch 52.5 (67469) - http://www.bohemiancoding.com/sketch -->  //create Post  */}
            <svg className="w-[30px] h-[30px]" viewBox="0 0 14 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    {/* <!-- Generator: Sketch 52.5 (67469) - http://www.bohemiancoding.com/sketch --> */}
    <title>add post</title>
    <desc>Created with Sketch.</desc>
    <g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="Rounded" transform="translate(-411.000000, -1487.000000)">
            <g id="Content" transform="translate(100.000000, 1428.000000)">
                <g id="-Round-/-Content-/-add" transform="translate(306.000000, 54.000000)">
                    <g transform="translate(0.000000, 0.000000)">
                        <polygon id="Path" points="0 0 24 0 24 24 0 24"></polygon>
                        <path d="M18,13 L13,13 L13,18 C13,18.55 12.55,19 12,19 C11.45,19 11,18.55 11,18 L11,13 L6,13 C5.45,13 5,12.55 5,12 C5,11.45 5.45,11 6,11 L11,11 L11,6 C11,5.45 11.45,5 12,5 C12.55,5 13,5.45 13,6 L13,11 L18,11 C18.55,11 19,11.45 19,12 C19,12.55 18.55,13 18,13 Z" id="🔹Icon-Color" fill="#fff"></path>
                    </g>
                </g>
            </g>
        </g>
    </g>
</svg>
        </motion.li>

        <motion.li
          initial={boxVariants.i}
          animate={boxVariants.s}
          className="px-3  py-2 border-white border-[1px] rounded-xl "
        >
          <svg width="32px" height="32px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlnssketch="http://www.bohemiancoding.com/sketch/ns">
    {/* <!-- Generator: Sketch 3.0.3 (7891) - http://www.bohemiancoding.com/sketch --> */}
    <title>search</title>
    <desc>Created with Sketch.</desc>
    <defs></defs>
    <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" sketchtype="MSPage">
        <g id="icon-111-search" sketchtype="MSArtboardGroup" fill="#fff">
            <path d="M19.4271164,21.4271164 C18.0372495,22.4174803 16.3366522,23 14.5,23 C9.80557939,23 6,19.1944206 6,14.5 C6,9.80557939 9.80557939,6 14.5,6 C19.1944206,6 23,9.80557939 23,14.5 C23,16.3366522 22.4174803,18.0372495 21.4271164,19.4271164 L27.0119176,25.0119176 C27.5621186,25.5621186 27.5575313,26.4424687 27.0117185,26.9882815 L26.9882815,27.0117185 C26.4438648,27.5561352 25.5576204,27.5576204 25.0119176,27.0119176 L19.4271164,21.4271164 L19.4271164,21.4271164 Z M14.5,21 C18.0898511,21 21,18.0898511 21,14.5 C21,10.9101489 18.0898511,8 14.5,8 C10.9101489,8 8,10.9101489 8,14.5 C8,18.0898511 10.9101489,21 14.5,21 L14.5,21 Z" id="search" sketchtype="MSShapeGroup"></path>
        </g>
    </g>
</svg>
        </motion.li>
        <motion.li
          initial={boxVariants.i}
          animate={boxVariants.s}
          className="px-3  py-2 border-white border-[1px] rounded-xl "
        >
          <svg id="Layer_1" dataname="Layer 1" className="w-[30px] h-[30px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25"><title>Video Play</title><path id="Video_Play" dataname="Video Play" d="M12.5,0A12.5,12.5,0,1,0,25,12.5,12.52,12.52,0,0,0,12.5,0Zm5.26,12.92-8,5A.56.56,0,0,1,9.5,18a.5.5,0,0,1-.24-.06A.51.51,0,0,1,9,17.5V7.5a.51.51,0,0,1,.26-.44.49.49,0,0,1,.51,0l8,5a.49.49,0,0,1,0,.84Z" fill="#fff"></path></svg>
        </motion.li>
        <motion.li
          initial={boxVariants.i}
          animate={boxVariants.s}
          className="px-3  py-2 border-white border-[1px] rounded-xl "
        >
          <svg width="30px" height="30px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlSpace="preserve" xmlnsserif="http://www.serif.com/"  fill="#fff"
          // style={{fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;}}
          >
            <g id="Icon"><circle cx="12" cy="7" r="5.75"></circle><path d="M21.25,21c-0,0.966 -0.783,1.75 -1.75,1.75l-15,-0c-0.967,-0 -1.75,-0.784 -1.75,-1.75c-0,-4.28 3.47,-7.75 7.75,-7.75l3,0c4.28,0 7.75,3.47 7.75,7.75Zm-0.729,0.729c-0.013,0.005 -0.021,0.011 -0.021,0.021l0.021,-0.021Z"></path></g></svg>
        </motion.li>
      </ul>
    </nav>
  );
}

export default YBar;
