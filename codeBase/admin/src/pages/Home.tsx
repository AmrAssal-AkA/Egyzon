import React, { useRef } from "react";

function HomePage() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (email?.trim() === "" || password?.trim() === "") return alert("Please fill in both email and password fields.");
    if (!email?.includes("@egyzon.com")) return alert("Please use your work email to login.");
   
    try {

    }catch(error){
      console.error("an error accoured ", error)
    }
  }


  return (
    <main className="flex h-screen w-screen overflow-hidden bg-white">
      <div className="flex w-full h-full">
        {/* Left side with image */}
        <div className="hidden w-1/2 md:block h-full">
          <img
            src="/background.png"
            alt="Admin dashboard background"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right side with login form */}
        <div className="w-full p-8 md:w-1/2 flex flex-col justify-center h-full">
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-2xl font-bold">
              Welcome to the Admin Dashboard
            </h1>
            <p className="text-gray-600">Please login to continue</p>
          </div>
          <form className="flex flex-col space-y-4 max-w-md mx-auto w-full" onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-2">
              <label htmlFor="email" className="font-semibold text-gray-700">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="enter your work email"
                ref={emailRef}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="password" className="font-semibold text-gray-700">
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                ref={passwordRef}
                required
                placeholder="enter your password"
              />
            </div>
            <button
              type="submit"
              className="rounded-md bg-blue-500 p-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default HomePage;
