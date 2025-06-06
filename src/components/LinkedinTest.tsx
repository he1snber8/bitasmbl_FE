import React, { useState } from "react";

import { useLinkedIn } from "react-linkedin-login-oauth2";
// You can use provided image shipped by this package or using your own
// import linkedin from 'react-linkedin-login-oauth2/assets/linkedin.png';

export default function LinkedInPage() {
  const { linkedInLogin } = useLinkedIn({
    clientId: "78u2u1gplwmf45",
    redirectUri: `${window.location.origin}/linkedin`, // for Next.js, you can use `${typeof window === 'object' && window.location.origin}/linkedin`
    onSuccess: (code) => {
      console.log(code);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <button
      className="bg-blue-700 text-white px-4 py-2 rounded"
      onClick={linkedInLogin}
    >
      Sign in with LinkedIn
    </button>
  );
}
