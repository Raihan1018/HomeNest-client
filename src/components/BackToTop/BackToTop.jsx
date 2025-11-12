import React, { useState, useEffect } from "react";
import Lottie from "lottie-react";
import upArrow from "../../Animation/UpArrow.json";

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <>
      {visible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-5 right-2 btn btn-primary shadow-lg w-15 h-20 p-2"
        >
          <Lottie
            animationData={upArrow}
            loop={true}
            style={{ width: 100, height: 100 }}
          />
        </button>
      )}
    </>
  );
};

export default BackToTop;
