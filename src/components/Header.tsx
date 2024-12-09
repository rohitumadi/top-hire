import { SignedIn, SignedOut, SignIn, UserButton } from "@clerk/clerk-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const Header = () => {
  const [showSignIn, setShowSignIn] = useState(false);

  function handleOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) {
      setShowSignIn(false);
    }
  }
  return (
    <nav className="flex items-center justify-between py-2 px-2 ">
      <Link to="/" className="">
        <img src="/logo2.png" alt="logo" className="w-24  rounded-full" />
      </Link>

      <div className="flex items-center gap-2">
        <SignedOut>
          <Button onClick={() => setShowSignIn(true)}>Sign In</Button>
        </SignedOut>
        <SignedIn>
          <UserButton />
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
