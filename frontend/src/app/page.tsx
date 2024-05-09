"use client";

import React from "react";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();

  const handleNavigate = () => {
    router.push("/sku");
  };
  return (
    <main className="flex min-h-screen flex-col items-center  p-24 space-y-4">
      <p> - Stock Keeping Uints CRUD - To see the web page navigate to /sku </p>
      <button
        onClick={handleNavigate}
        className="relative inline-block text-lg group"
      >
        <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
          <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
          <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
          <span className="relative">Navigate</span>
        </span>
        <span
          className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
          data-rounded="rounded-lg"
        ></span>
      </button>
    </main>
  );
}
