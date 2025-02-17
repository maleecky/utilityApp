import bcrypt from "bcryptjs";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "TZS",
  }).format(price);
};

export const compareHash = async (password: string, hashedPassword: string) => {
  return await bcrypt.compare(password, hashedPassword);
};
