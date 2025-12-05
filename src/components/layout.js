import * as React from "react";
import Header from "./header";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main className="pt-20">{children}</main>
      <footer>Footer</footer>
    </>
  );
}
