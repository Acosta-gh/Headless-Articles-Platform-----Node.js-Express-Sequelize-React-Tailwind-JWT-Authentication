import React from "react";
import Hero from "@/components/home/Hero";
import BlogPage from "../components/ui/blog-page";
function Home() {
  return (
    <>
      <div className="container mx-auto ">
        <Hero />
        <BlogPage />
      </div>
    </>
  );
}

export default Home;
