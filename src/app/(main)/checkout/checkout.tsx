/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { Session } from "next-auth";
import { Form } from "@/components/ui/form";
import CustomFieldField from "@/components/globalui/custom-form-field";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { makePayment } from "@/lib/server-action";

const transactionSchema = z.object({
  accountNumber: z.string().nonempty(),
  amount: z.string().nonempty(),
  currency: z.string().nonempty(),
  externalId: z.string().nonempty(),
  provider: z.string().nonempty(),
  serviceId: z.string().nonempty(),
  userId: z.string().nonempty(),
});

export default function CheckoutUi({ user }: { user: Session | null }) {
  const router = useRouter();

  const searchParams = useSearchParams();
  const service = searchParams.get("service");
  const price = searchParams.get("price");

  const form = useForm({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      accountNumber: "",
      amount: price ? formatPrice(Number(price)) : formatPrice(0),
      currency: "TZS",
      externalId: `order-${Math.floor(Math.random() * 1000000)}`,
      provider: "",
      serviceId: service ? service : "",
      userId: user?.user?.id as string,
    },
  });

  const handlePayment = async (values: z.infer<typeof transactionSchema>) => {
    if (!user) router.push("/login");

    const response = await makePayment(values);

    console.log(response);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col ">
      <div className="bg-blue-600   text-white py-4 px-6 flex justify-center items-center shadow-md w-full">
        <h2 className="text-2xl font-bold text-white mb-4">Checkout </h2>
      </div>
      <div className="flex-1 flex justify-center items-center">
        <div className="bg-white my-8 space-y-6  p-6 rounded-lg shadow-lg text-center w-[360px] max-w-md">
          <div className="space-y-4 border-b border-gray-200 pb-4">
            <p className="border border-blue-600 bg-slate-100 rounded-full p-[8px] text-sm">
              Use Azampay method
            </p>
            <p className="text-sm text-gray-700">
              Now we are currently support only one payment method in a near
              future. You will be able to use your credit cards and other
              payments method.
            </p>
          </div>
          <div>
            <h3 className="text-left text-[800] mb-4">Order Summary</h3>

            <div className="space-y-[2px] border-b border-gray-200 pb-4">
              <div className="flex justify-between text-sm">
                <p className="text-left ">Service:</p>
                <p>{service}</p>
              </div>
              <div className="flex justify-between text-sm">
                <p className="text-left ">Price:</p>
                <p>{price ? formatPrice(Number(price)) : formatPrice(0)}</p>
              </div>
              <div className="flex justify-between text-sm">
                <p className="text-left ">Estimated tax to be collected:</p>
                <p>{formatPrice(0)}</p>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-base font-bold mt-4">
                <p className="text-left ">Total:</p>
                <p>{price ? formatPrice(Number(price)) : formatPrice(0)}</p>
              </div>
            </div>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handlePayment)}>
              <div className="space-y-4">
                <CustomFieldField
                  type="phone"
                  placeholder="Enter your Phone number"
                  control={form.control}
                  name="accountNumber"
                />
                <CustomFieldField
                  type="select"
                  control={form.control}
                  name="provider"
                />
              </div>
              <Button
                type="submit"
                className="mt-4 bg-blue-600 w-full text-white px-6 py-2 rounded-md hover:bg-blue-700"
              >
                Pay now
              </Button>
            </form>
          </Form>
        </div>
      </div>
      <Button variant={"outline"} onClick={() => router.back()}>
        <ArrowLeft />
        <p>Go back</p>
      </Button>
    </div>
  );
}
