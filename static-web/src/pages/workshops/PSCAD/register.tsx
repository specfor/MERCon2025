import React, { useEffect } from "react";
import { createPageHead } from "../../../components/pageHead";

const RegisterRedirectPage = () => {
  useEffect(() => {
    window.location.href =
      "https://docs.google.com/forms/d/e/1FAIpQLSca_zAEpdMVA-z-n7KN1zzWblMB3Mj5XwvEGYfwweaU_5d1Rg/viewform?usp=dialog";
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <p>Redirecting to the registration form...</p>
    </div>
  );
};

export default RegisterRedirectPage;

export const Head = createPageHead({
  title: "Register for PSCAD Workshop",
  description: "Redirecting to the PSCAD Workshop registration form...",
});
