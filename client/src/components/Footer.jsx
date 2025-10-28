import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  GithubIcon,
  TwitterIcon,
  Shell,
} from "lucide-react";

import { Link } from "react-router-dom";

const footerLinks = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "News",
    href: "/articles",
  },
  {
    title: "Profile",
    href: "/profile",
  },
];

const Footer = () => {
  return (
    <div className="bg-muted flex flex-col">
      <div className="grow bg-muted" />
      <footer className="border-t">
        <div className="max-w-[var(--breakpoint-xl)] mx-auto">
          <div className="py-12 flex flex-col sm:flex-row items-start justify-between gap-x-8 gap-y-10 px-6 xl:px-0">
            {/* Logo and Navigation */}
            <div>
              <Link to="/" className="flex items-center gap-3">
                <Shell className="h-7 w-7" />
                <span className="font-bold text-xl text-foreground">
                  FOSS News
                </span>
              </Link>
              <ul className="mt-6 flex gap-4 flex-col">
                {footerLinks.map(({ title, href }) => (
                  <li key={title}>
                    <Link
                      to={href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            {/* Newsletter */}
            <div className="max-w-xs w-full min-h-[200px]">
              <h6 className="font-medium">Subscribe to our newsletter</h6>
              <form className="mt-6 flex items-center gap-2 bg-background">
                <Input type="email" placeholder="Your email address" />
                <Button disabled className="opacity-50 cursor-not-allowed">
                  Coming soon
                </Button>
              </form>
              <p className="text-xs text-muted-foreground mt-2">
                You’ll soon be able to subscribe for the latest updates.
              </p>
            </div>
          </div>
          <Separator />
          <div className="py-8 flex flex-col-reverse sm:flex-row items-center justify-between gap-x-2 gap-y-5 px-6 xl:px-0">
            {/* Copyright */}
            <span className="text-muted-foreground">
              &copy; {new Date().getFullYear()}{" "}
              <Link to="/" className="hover:underline text-foreground font-semibold">
                FOSS News
              </Link>
              . All rights reserved.
            </span>
            <div className="flex items-center gap-5 text-muted-foreground">
              <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
                <TwitterIcon className="h-5 w-5" />
              </a>
              <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
                <GithubIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;