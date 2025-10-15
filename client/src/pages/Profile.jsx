import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

function Profile() {
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const { profile, loading, error } = useProfile();
  const navigate = useNavigate();
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading profile</p>;
  if (!profile) return <p>No profile data available</p>;

  console.log("Profile data:", profile);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!isAuthenticated()) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="p-8">
          <p className="text-center text-lg text-muted-foreground">
            Please log in to view your profile.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <section className="block mx-auto justify-center min-h-screen px-4 py-12">
      <Card className="w-full max-w-md mx-auto shadow-lg">
        <CardHeader className="flex flex-col items-center gap-4">
          <Avatar className="w-24 h-24">
            <AvatarImage src={profile.username} alt={profile.username} />
            <AvatarFallback>
              {profile.username
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div>
            <h2 className="text-2xl font-bold text-center">
              {profile.username}
            </h2>
            <p className="text-sm text-muted-foreground text-center">
              {profile.email}
            </p>
            <p className="mt-1 text-xs text-muted-foreground text-center">
              {profile.admin ? "Admin" : "User"}
            </p>
          </div>
        </CardHeader>
        <CardFooter className="flex justify-end gap-2">
          <Button variant="outline">
            <Link to="/admin">Admin Panel</Link>
          </Button>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
          <Button variant="outline">Edit Profile</Button>
        </CardFooter>
      </Card>
    </section>
  );
}

export default Profile;
