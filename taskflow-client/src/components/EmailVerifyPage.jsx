// EmailVerifyPage.jsx
import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const EmailVerifyPage = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("verifying"); // verifying | success | failed
  const navigate = useNavigate();

  useEffect(
    //() => {
//     const token = searchParams.get("token");

//     const verifyEmail = async () => {
//       try {
//         const res = await fetch("/api/verify-email", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ token }),
//         });

//         if (res.ok) {
//           setStatus("success");
//           setTimeout(() => navigate("/"), 3000); // redirect to homepage after 3s
//         } else {
//           setStatus("failed");
//         }
//       } catch (err) {
//         console.error(err);
//         setStatus("failed");
//       }
//     };

//     if (token) verifyEmail();
//     else setStatus("failed");
//   }, [searchParams, navigate]
);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow text-center w-full max-w-md">
        {status === "verifying" && <p>🔄 Verifying your email...</p>}
        {status === "success" && <p className="text-green-600">✅ Email verified successfully! Redirecting...</p>}
        {status === "failed" && (
          <p className="text-red-500">❌ Invalid or expired verification link.</p>
        )}
      </div>
    </div>
  );
};

export default EmailVerifyPage;
