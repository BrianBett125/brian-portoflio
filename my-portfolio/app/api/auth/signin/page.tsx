"use client";

import { getProviders, signIn } from "next-auth/react";
import type { ClientSafeProvider } from "next-auth/react";
import { useEffect, useState } from "react";

export default function SignIn() {
  const [providers, setProviders] = useState<Record<
    string,
    ClientSafeProvider
  > | null>(null);

  useEffect(() => {
    getProviders().then(setProviders);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl font-bold mb-4">Sign In</h1>
      {providers ? (
        Object.values(providers).map((provider) => (
          <div key={provider.id}>
            <button
              className="btn-cyber btn-cyber-primary text-white py-2 px-4 rounded-xl"
              onClick={() => signIn(provider.id)}
            >
              Sign in with {provider.name}
            </button>
          </div>
        ))
      ) : (
        <p>Loading providers...</p>
      )}
    </div>
  );
}
