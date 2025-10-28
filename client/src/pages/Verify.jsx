import React, { useEffect } from "react";
import { useVerify } from "@/hooks/useVerify";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";

function Verify() {
  // -------------------
  //      🎣 Hooks
  // -------------------  
  const { loading, error, success, verifyEmail } = useVerify();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    if (token) verifyEmail(token);
  }, [verifyEmail]);

  // -------------------
  //     🖥️ Render 
  // -------------------
  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/30">
      <Card className="w-full max-w-md text-center p-6 shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            {loading ? "Verifying your email..." : "Email Verification"}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {loading && (
            <div className="flex flex-col items-center space-y-2">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <p className="text-muted-foreground">Please wait while we verify your email.</p>
            </div>
          )}

          {error && (
            <div className="flex flex-col items-center space-y-2">
              <XCircle className="w-10 h-10 text-destructive" />
              <p className="text-destructive font-medium">{error}</p>
            </div>
          )}

          {success && (
            <div className="flex flex-col items-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
              <p className="text-green-600 font-medium">Your email has been successfully verified!</p>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-center">
          <Button
            variant="default"
            onClick={() => (window.location.href = "/login")}
            disabled={loading}
          >
            {success ? "Go to Login" : "Back to Home"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Verify;
