/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomFieldField from "@/components/globalui/custom-form-field";
import { RegisterUser } from "@/lib/server-action";
import Link from "next/link";

const signUpSchema = z
  .object({
    name: z.string().nonempty(),
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function SignUpPage() {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  const handleSubmit = async (values: z.infer<typeof signUpSchema>) => {
    const { confirmPassword, ...data } = values;

    try {
      await RegisterUser(data);

      router.push("/auth/sign-in");
    } catch (error) {
      if (error) throw new Error("An error occurred while registering user");
    }
  };

  return (
    <div className="flex flex-col  min-h-screen ">
      <div className="flex flex-1  flex-col items-center justify-center ">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="w-[480px] py-10 bg-white   p-6 rounded-lg shadow-lg border max-w-md"
          >
            <h2 className="text-2xl text-center  font-bold !mb-8">Sign Up</h2>
            <div className="space-y-4">
              <div className="sm:flex items-center justify-center gap-4 w-full">
                <CustomFieldField
                  type="text"
                  placeholder="Enter your full name"
                  label="Full name"
                  control={form.control}
                  name="name"
                />
                <CustomFieldField
                  type="email"
                  placeholder="Enter your email address"
                  label="Email"
                  control={form.control}
                  name="email"
                />
              </div>
              <CustomFieldField
                name="password"
                control={form.control}
                label="Password"
                type="password"
                placeholder="Enter password must contain atleast 8 characters"
              />
              <CustomFieldField
                name="confirmPassword"
                control={form.control}
                label="Confirm password"
                type="password"
                placeholder="Enter password must contain atleast 8 characters"
              />
            </div>
            <Button
              type="submit"
              className="!mt-6 bg-blue-600 w-full  text-white px-6 py-2 rounded-md hover:bg-blue-700"
            >
              Sign Up
            </Button>
            <div className="text-center mt-4  text-sm">
              Already have an account?{" "}
              <Link href="/auth/sign-in" className="underline text-blue-500">
                Sign in
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
