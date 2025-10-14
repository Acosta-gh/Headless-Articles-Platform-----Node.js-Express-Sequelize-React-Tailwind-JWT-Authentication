import React, {useEffect} from "react";
import { useVerify } from "@/hooks/useVerify";
function Verify() {
  const { loading, error, success, verifyEmail } = useVerify();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    if (token) {
      verifyEmail(token);
    }
  }, [verifyEmail]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {success && <p>Email verified successfully!</p>}
    </div>
  );
}

export default Verify;
