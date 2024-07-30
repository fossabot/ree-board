"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import { redirect } from 'next/navigation';

export default function Home() {
  const { user, isLoading } = useUser();
  if (!isLoading && !user) {
    redirect('/api/auth/login')
  } else {
    redirect('/api/auth/login')
  }
}
