import React from "react";

const Logo = () => {
  return (
    <div className="flex items-center gap-2 mb-2">
      <div className="w-10 h-10 bg-emerald-600  flex items-center justify-center rounded-full font-bold text-lg">
        HN
      </div>
      <span className="text-xl font-semibold">HomeNest</span>
    </div>
  );
};

export default Logo;
