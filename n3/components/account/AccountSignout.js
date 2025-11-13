"use client";

import { signOut, useSession } from "next-auth/react";

export default function AccountSignout() {
  const { data } = useSession();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <section className="w-full max-w-md">
        <header className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Sign out</h1>
        </header>

        {!data && (
          <article className="bg-white border border-gray-200 rounded-lg p-6">
            <p className="text-gray-600 mb-4">You are not signed in</p>
            <a
              href="/account/signin"
              className="inline-block bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-800"
            >
              Go to sign in
            </a>
          </article>
        )}

        {data && (
          <article className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Signed in as</p>
                <p className="text-base font-medium text-gray-900">{data.user?.email || data.user?.name}</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  signOut({ callbackUrl: "/account/signin" });
                }}
                className="w-full bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
              >
                Sign out
              </button>
            </div>
          </article>
        )}
      </section>
    </div>
  );
}
