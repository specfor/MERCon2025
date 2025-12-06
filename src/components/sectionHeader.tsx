import * as React from "react";

const SectionHeader: React.FC<{ headerText: string; textClass?: string }> = ({
  headerText,
  textClass = "text-white",
}) => (
  <div className="text-center mb-16">
    <h1 className={`text-4xl md:text-5xl font-bold inline-block relative ${textClass}`}>
      {headerText}
      {/* Decorative underline */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-1 bg-linear-to-r from-transparent via-primary-500 to-transparent rounded-full"></div>
    </h1>
  </div>
);

export default SectionHeader;
