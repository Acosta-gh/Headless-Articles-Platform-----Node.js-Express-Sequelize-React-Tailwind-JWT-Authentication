import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

function Profile() {
  const { isAdmin } = useAuth();

  return (
    <div>
      Profile
      <div>
        <h2>Welcome to your profile!</h2>
        <p>This is a protected page.</p>
        <Link to="/">Go to Home</Link>
        {isAdmin() && <Link to="/admin">Go to Admin Panel</Link>}
      </div>
    </div>
  );
}

export default Profile;
