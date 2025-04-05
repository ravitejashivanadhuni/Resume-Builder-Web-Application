import React, { useEffect } from "react";

const GoogleAd = () => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("Adsense error", e);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client={import.meta.env.VITE_GOOGLE_AD_CLIENT}
      data-ad-slot={import.meta.env.VITE_GOOGLE_AD_SLOT}
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
};

export default GoogleAd;
