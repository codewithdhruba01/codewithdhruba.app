import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getUserId(): string {
  // Check if user ID already exists in session storage
  let userId = sessionStorage.getItem('userId');

  if (!userId) {
    // Generate a new user ID based on timestamp and random string
    userId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('userId', userId);
  }

  return userId;
}
