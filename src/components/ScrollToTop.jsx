import { useState, useEffect } from "react";
import { MdKeyboardControlKey } from "../utils/icons";

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollBtnHandler = () => {
    window.scroll({ top: 0, behavior: "smooth" });
  };

  const listenToScroll = () => {
    const heightoBeHidden = 100;
    const winHeight =
      document.body.scrollTop || document.documentElement.scrollTop;
    setIsVisible(winHeight > heightoBeHidden);
  };

  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
    return () => window.removeEventListener("scroll", listenToScroll);
  }, []);

  return (
    <>
      {isVisible && (
        <button
          className="fixed bottom-[1.7rem] right-[1.7rem] bg-[#473699] h-12 w-12 rounded-full p-0.5 hover:opacity-90"
          onClick={scrollBtnHandler}
        >
          <div className="flex items-center justify-center cursor-pointer">
            <MdKeyboardControlKey className="text-2xl text-[white]" />
          </div>
        </button>
      )}
    </>
  );
};
