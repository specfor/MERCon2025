import * as React from "react";
import Header from "./header";
import Footer from "./footer";

export default function Layout({ children, ...props }) {
  return (
    <>
      <Header location={props.location} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
