import React from "react";

const ReadKHBanner = () => {
  return (
    <div className="relative w-full h-40 sm:h-52 md:h-64 lg:h-64 p-3 sm:p-4 md:p-6 lg:p-6 rounded-2xl shadow-lg overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full bg-cover bg-center rounded-2xl">
        <img
          src="/images/readKh/readKh.png"
          alt="READKH Banner"
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>
    </div>
  );
};

export default ReadKHBanner;
