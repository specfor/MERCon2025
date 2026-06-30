"use client";
import { useState } from "react";
import * as htmlToImage from "html-to-image";

export default function PrintButton() {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const element = document.getElementById("receipt-container");
      if (!element) return;
      
      const dataUrl = await htmlToImage.toPng(element, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: "#ffffff",
        filter: (node) => {
          // exclude the print button itself from the image
          return node.id !== "download-btn-wrapper";
        }
      });
      
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "MERCon_2026_Receipt.png";
      link.click();
    } catch (err) {
      console.error("Error generating image", err);
      alert("Failed to generate receipt image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      className={`bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-8 rounded-xl shadow-lg transition transform ${loading ? 'opacity-70 cursor-wait' : 'hover:-translate-y-0.5'}`}
    >
      {loading ? "Generating Image..." : "Download Receipt (PNG)"}
    </button>
  );
}
