"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function AccountSignin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleClickSignin = (e) => {
    e.preventDefault();
    signIn("credentials", { username, password, callbackUrl: "/" });
  };

  const handleClickKakao = () => {
    signIn("kakao", { callbackUrl: "/" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <section className="w-full max-w-md">
        <header className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Sign in</h1>
        </header>
        <form onSubmit={handleClickSignin} className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
          <fieldset className="space-y-4">
            <legend className="sr-only">Login Credentials</legend>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="username"
                type="email"
                name="username"
                value={username}
                onChange={(e) => {
                  setUsername(() => e.target.value);
                }}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                value={password}
                onChange={(e) => {
                  setPassword(() => e.target.value);
                }}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
            >
              Sign in
            </button>
          </fieldset>
        </form>
        <aside className="mt-4">
          <div className="relative mb-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">or</span>
            </div>
          </div>
          <button
            onClick={handleClickKakao}
            type="button"
            className="w-full bg-yellow-300 hover:bg-yellow-400 text-gray-900 py-2 px-4 rounded font-medium"
          >
            Kakao
          </button>
        </aside>
      </section>
    </div>
  );
}
