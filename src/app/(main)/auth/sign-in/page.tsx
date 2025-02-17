/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomFieldField from "@/components/globalui/custom-form-field";
import { signUser } from "@/lib/server-action";
import Link from "next/link";

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export default function SignInPage() {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });

  const handleSubmit = async (values: z.infer<typeof signInSchema>) => {
    try {
      await signUser(values);

      router.refresh();
    } catch (error) {
      if (error)
        form.setError("password", {
          message: error as string,
        });
    }
  };

  return (
    <div className="flex flex-col  min-h-screen ">
      <div className="flex flex-1  flex-col items-center justify-center ">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="w-[380px] py-10 bg-white   p-6 rounded-lg shadow-lg border max-w-md"
          >
            <h2 className="text-2xl text-center  font-bold !mb-8">Sign In</h2>
            <div className="space-y-4">
              <CustomFieldField
                type="email"
                placeholder="Enter your email address"
                label="Email"
                control={form.control}
                name="email"
              />

              <CustomFieldField
                name="password"
                control={form.control}
                label="Password"
                type="password"
                placeholder="Enter password must contain atleast 8 characters"
              />
            </div>
            <Button
              type="submit"
              className="!mt-6 bg-blue-600 w-full  text-white px-6 py-2 rounded-md hover:bg-blue-700"
            >
              Sign In
            </Button>
            <div className="text-center mt-4  text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/auth/sign-up" className="underline text-blue-500">
                Sign up
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
