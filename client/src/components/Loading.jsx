import React from "react";
import { Spinner } from "@/components/ui/spinner";

function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center relative bottom-24">
      <Spinner className="size-8" />
    </div>
  );
}

export default Loading;
