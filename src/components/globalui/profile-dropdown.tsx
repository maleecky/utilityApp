"use client";

import { signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";

export default function ProfileDropdown({ user }: { user: Session | null }) {
  const router = useRouter();

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex p-2 rounded-full  text-blue-600 cursor-pointer items-center text-sm space-x-2"
        >
          <span>{user?.user?.name?.slice(0, 2)}</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={() => router.push("/profile")}>
          Edit Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/settings/payment")}>
          Payment Settings
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => signOut()} className="text-red-500">
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
