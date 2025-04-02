import React from "react";

const ReadKHBanner = () => {
  return (
    <div className="relative w-full h-64 p-6 rounded-2xl shadow-lg overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full bg-cover bg-center rounded-2xl">
        <img
          src="https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg"
          alt="READKH Banner"
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>
    </div>
  );
};

export default ReadKHBanner;
