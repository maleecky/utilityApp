/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import ProfileDropdown from "@/components/globalui/profile-dropdown";
import { Button } from "@/components/ui/button";
import { BellElectric, GlassWaterIcon, WifiIcon } from "lucide-react";
import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";

export default function HomeUi({ user }: { user: Session | null }) {
  const services = [
    {
      name: "Electricity Payment",
      description: "Pay your electricity bills easily.",
      price: 20000,
      image: <BellElectric width={64} size={64} />,
    },
    {
      name: "Water Bill Payment",
      description: "Settle your water bills hassle-free.",
      price: 15000,
      image: <GlassWaterIcon width={64} size={64} />,
    },
    {
      name: "Internet Subscription",
      description: "Renew your internet packages instantly.",
      price: 50000,
      image: <WifiIcon width={64} size={64} />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4 px-6 flex justify-between items-center shadow-md">
        <Link href="/">
          <h1 className="text-2xl font-bold cursor-pointer">UtilityPay</h1>
        </Link>
        <nav className="flex gap-4 items-center">
          <Link href="/about" className="mx-4 hover:underline">
            About Us
          </Link>
          {user ? (
            <ProfileDropdown user={user} />
          ) : (
            <Link
              href="/auth/sign-in"
              className="ml-4 bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-gray-200"
            >
              Login
            </Link>
          )}
        </nav>
      </header>

      {/* Banner */}
      <div className="relative w-full h-64 bg-blue-500 flex items-center justify-center text-white text-center">
        <div>
          <h2 className="text-4xl font-bold">Fast & Secure Utility Payments</h2>
          <p className="text-lg mt-2">
            Pay your electricity, water, and internet bills in one place.
          </p>
        </div>
      </div>

      {/* Services Section */}
      <div className="flex flex-col items-center justify-center py-10">
        <h2 className="text-3xl font-bold text-blue-600 mb-6">
          Choose a Service
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl px-4">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg text-center transition-transform transform hover:scale-105"
            >
              <div className="w-16 h-16 mx-auto mb-4">
                {typeof service.image === "string" ? (
                  <Image
                    src={service.image}
                    alt={service.name}
                    width={64}
                    height={64}
                  />
                ) : (
                  service.image
                )}
              </div>
              <h2 className="text-xl font-semibold mb-2 text-gray-700">
                {service.name}
              </h2>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <Link
                href={`/checkout?service=${encodeURIComponent(
                  service.name
                )}&price=${service.price}`}
              >
                <Button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                  Proceed to Pay
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4 mt-auto">
        <div className="container flex align-center justify-between mx-auto text-center">
          <p>&copy; 2025 UtilityApp. All rights reserved.</p>
          <p>
            <a href="/terms" className="hover:underline">
              Terms
            </a>{" "}
            |{" "}
            <a href="/privacy" className="hover:underline">
              Privacy
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
