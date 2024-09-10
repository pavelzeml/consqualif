import React, { useEffect, useState } from "react";
import { getCookie, setCookie } from "../configs/cookieUtils";
import { AnimatePresence, motion } from "framer-motion";
import { Check, X } from "react-feather";
import { config } from "../styles/global";

interface CookieConsentBannerProps {
  consentCookieName: string;
  expires: number;
}

const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({
  consentCookieName,
  expires,
}) => {
  const [isBannerVisible, setBannerVisibility] = useState<boolean>(false);

  useEffect(() => {
    const isConsentGiven = getCookie(consentCookieName);
    if (!isConsentGiven) {
      setBannerVisibility(true);
    }
  }, [consentCookieName]);

  const handleConsent = () => {
    setCookie(consentCookieName, "true", expires);
    setBannerVisibility(false);
  };

  const handleDecline = () => {
    setCookie(consentCookieName, "false", expires);
    setBannerVisibility(false);
  };

  if (!isBannerVisible) return null;

  return (
    <div className="fixed z-10 left-0 right-0 bottom-0 items-center md:bottom-3 w-full flex">
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ y: "150%" }}
          animate={{ y: "0%" }}
          exit="toDown"
          transition={{
            ease: config.animations.speed,
            duration: 1.5,
            delay: 1.1,
          }}
          className="md:w-fit bg-black border-wh15 border-[1px] gap-4 w-full py-2 px-4 md:mx-3 flex items-center md:rounded-xl backdrop-blur-3xl mix-blend-difference "
        >
          <CookieText />
          <div className="flex items-end justify-end gap-2 md:w-full w-fit md:justify-center">
            <button
              aria-label="close"
              onClick={handleDecline}
              className="btn hover:scale-105 duration-150 text-white bg-[#fff2] border-[#fff2] border-[1px] rounded-md w-14 h-8 px-2 md:w-full"
            >
              <X />
            </button>
            <button
              aria-label="aprove"
              onClick={handleConsent}
              className="btn hover:scale-105 duration-150 text-white bg-[#fff2] border-[#fff2] border-[1px] rounded-md w-14 h-8 px-2 md:w-full"
            >
              <Check />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

function CookieText() {
  return (
    <div className="flex md:flex-row flex-col w-full gap-2">
      <span className="text-white">Cookies:</span>
      <p className="text-white  md:w-full whitespace-normal md:whitespace-nowrap text-sm opacity-75">
        This site uses cookies to provide for better user experience.
      </p>
    </div>
  );
}

export default CookieConsentBanner;
