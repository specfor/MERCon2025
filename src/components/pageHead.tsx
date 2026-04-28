import React from "react";
import type { HeadFC } from "gatsby";

export interface PageHeadConfig {
  title: string;
  description: string;
  noIndex?: boolean;
}

export function createPageHead({ title, description, noIndex = false }: PageHeadConfig): HeadFC {
  return () => (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:site_name" content="MERCon 2026" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="theme-color" content="#0e2e20" />
      {noIndex && <meta name="robots" content="noindex,nofollow" />}
    </>
  );
}
