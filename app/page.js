"use client";

import Head from 'next/head';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window != undefined) {
      if (typeof window != undefined && "serviceWorker" in window.navigator) {
        window.addEventListener('load', () => {
          navigator.serviceWorker.register('/service-worker.js').then((registration) => {
            console.log('Service Worker registered with scope:', registration.scope);
          }).catch((error) => {
            console.log('Service Worker registration failed:', error);
          });
        });
      }

    }
  });
  
  if (typeof window != undefined && localStorage.getItem("profileObj")) {
    location.pathname = "/dashboard";
  }

  return (
    <>
      <Head>
        <title>My Anime Diary</title>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
      </Head>

      <div className="min-h-screen">
        <main className="px-6 sm:px-20 w-full">
          <section className="text-gray-600 body-font">
            <div className="container mx-auto flex px-5 py-5 sm:py-10 md:flex-row flex-col-reverse items-center">
              <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 mt-4 md:mb-0 items-center text-center">
                <h1 className="title-font sm:text-5xl text-3xl mb-5 sm:mb-8 font-medium text-gray-900">
                  Your peronal diary for tracking your anime progress.
                </h1>
                <p className="mb-6 sm:mb-8 leading-relaxed text-lg sm:text-md">
                  Tired of writing your anime progress in the Notes app?
                  <br />
                  Dont&apos;t worry My Anime Diary <br className="sm:hidden" /> aka MAD is there for you.
                </p>
                <div className="flex justify-center">
                  <button className="inline-flex text-white bg-slate-600 border-0 py-2 px-4 sm:px-6 focus:outline-none hover:bg-slate-700 rounded text-lg" onClick={() => router.push("/login")}>
                    Get Started &gt;
                  </button>
                  <button className="ml-4 inline-flex text-slate-700 bg-gray-200 border-0 py-2 px-4 sm:px-6 focus:outline-none hover:bg-gray-300 rounded text-lg" onClick={() => router.push("/login")}>
                    Sign In
                  </button>
                </div>
              </div>
              <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
                <img className="rounded-full" alt="logo" src="/logo.jpg" />
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
