"use client";
import Image from "@node_modules/next/image";
import Link from "@node_modules/next/link";
import { useState, useEffect } from "react";
import { signIn, signOut, getProviders, useSession } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession(); // automatically fetches session data from NextAuth.
  const [toggleDropdown, setToggleDropdown] = useState(false);

  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();//getProviders() makes a request to NextAuth’s API it gets a list of available providers (Google, GitHub).using handelers GET
      setProviders(response);
    };
    setUpProviders();
  }, []);

  // what a provider looks like : 
  /*{"google": {
    "id": "google",
    "name": "Google",
    "type": "oauth",
    "signinUrl": "http://localhost:3000/api/auth/signin/google"
  }
  }*/


  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="logo image"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">ReperoPrompt</p>
      </Link>

      {/*desktop view */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button type="button" onClick={signOut} className="outline_btn">
              Sign out
            </button>
            <Link href="/profile">
              <Image
                src={session?.user.image}
                alt="profile image"
                width={37}
                height={37}
                className="rounded-full"
              />
            </Link>
          </div>
        ) : (
          <>
            <>
              {providers &&
                Object.values(providers).map((provider) => (
                  <button
                    type="button"
                    key={provider.name}
                    onClick={() => signIn(provider.id)} // Redirects the user to Google's login page using handelers POST
                    className="black_btn"
                  >
                    Sign in with {provider.name}
                  </button>
                ))}
            </>
          </>
        )}
      </div>
      {/*mobile view */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image}
              alt="logo image"
              width={37}
              height={37}
              onClick={() => setToggleDropdown((prev) => !prev)}
              className="rounded-full"
            />
            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  {" "}
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  {" "}
                  Create Prompt
                </Link>
                <button
                  type="button"
                  className="mt-5 w-full black_btn"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                >
                  {" "}
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button>Sign in</button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
