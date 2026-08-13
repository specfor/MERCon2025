import React, { useEffect } from "react";
import type { HeadFC } from "gatsby";
import { ExternalLink } from "lucide-react";

const targetUrl =
  "https://docs.google.com/forms/d/e/1FAIpQLScK1e0ncs-McZKROaPQqOr049CopjcLKxKzz3nZe_fiJM4zcg/viewform?usp=dialog";

const Lidar360RegisterPage: React.FC = () => {
  useEffect(() => {
    window.location.replace(targetUrl);
  }, []);

  return (
    <div className="relative w-full min-h-[75vh] flex items-center justify-center overflow-hidden">
      {/* ===== FIXED GREEN BACKGROUND ===== */}
      <div
        className="fixed inset-0 -z-20"
        style={{
          background: `
          radial-gradient(
            circle at center,
            rgb(14, 46, 32) 0%,
            rgb(8, 26, 18) 45%,
            rgb(2, 6, 4) 80%
          )
          `,
        }}
      />

      {/* ===== CONTENT ===== */}
      <section className="relative z-40 px-6 py-24 text-center max-w-lg mx-auto">
        <div className="bg-gray-900/60 border border-primary-500/20 rounded-2xl p-8 backdrop-blur-md shadow-2xl">
          <div className="w-16 h-16 bg-primary-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary-400">
            <ExternalLink className="w-8 h-8 animate-pulse" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-3 topic">
            Redirecting to Registration
          </h1>
          <p className="text-gray-300 text-sm mb-6 leading-relaxed para">
            You are being redirected to the LiDAR360 Workshop registration form on Google Forms.
          </p>
          <a
            href={targetUrl}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-colors duration-200 text-sm shadow-lg shadow-primary-500/20 para"
          >
            <span>Click here if not redirected automatically</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </section>
    </div>
  );
};

export default Lidar360RegisterPage;

export const Head: HeadFC = () => {
  return (
    <>
      <title>Redirecting to LiDAR360 Workshop Registration - MERCon 2026</title>
      <meta name="description" content="Redirecting to LiDAR360 Workshop Registration Form" />
      <meta name="robots" content="noindex,nofollow" />
      <meta httpEquiv="refresh" content={`0; url=${targetUrl}`} />
    </>
  );
};
