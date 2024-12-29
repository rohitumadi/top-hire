import {
  SignedIn,
  SignedOut,
  SignIn,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { BriefcaseBusiness, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";

const Header = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [search, setSearch] = useSearchParams();
  const { user } = useUser();
  useEffect(() => {
    if (search.get("sign-in")) {
      setShowSignIn(true);
    }
  }, [search]);

  function handleOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) {
      setShowSignIn(false);
      setSearch({});
    }
  }
  const role = user?.unsafeMetadata.role;
  return (
    <nav className="flex items-center justify-between py-2 px-2 ">
      <Link to="/" className="">
        <img src="/logo2.png" alt="logo" className="w-24  rounded-full" />
      </Link>

      <div className="flex items-center gap-2">
        {role === "recruiter" && (
          <Link to="/post-job">
            <Button>Post a Job</Button>
          </Link>
        )}

        <Link to="/jobs">
          <Button>Jobs</Button>
        </Link>
        <ModeToggle />
        <SignedOut>
          <Button onClick={() => setShowSignIn(true)}>Sign In</Button>
        </SignedOut>
        <SignedIn>
          <UserButton
            appearance={{
              elements: {
                avatarBox: "w-10 h-10",
              },
            }}
          >
            <UserButton.MenuItems>
              <UserButton.Link
                label="My Jobs"
                labelIcon={<BriefcaseBusiness size={15} />}
                href="/my-jobs"
              />
              <UserButton.Link
                label="Saved Jobs"
                labelIcon={<Heart size={15} />}
                href="/saved-jobs"
              />
            </UserButton.MenuItems>
          </UserButton>
        </SignedIn>
      </div>
      {showSignIn && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={handleOverlayClick}
        >
          <SignIn
            signUpFallbackRedirectUrl={"/onboarding"}
            fallbackRedirectUrl={"/onboarding"}
          />
        </div>
      )}
    </nav>
  );
};
export default Header;
